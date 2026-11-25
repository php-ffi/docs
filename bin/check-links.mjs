#!/usr/bin/env node
// Checks every internal link (absolute and relative) of the built site in dist/,
// including #anchors. Run after `npm run build`:
//
//   node bin/check-links.mjs
//
// Exits with 1 when broken links exist.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

const files = (dir) => readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : path.endsWith('.html') ? [path] : [];
});

/** URL path of a built page: dist/parser/usage/index.html → /parser/usage/ */
const pageUrl = (file) => '/' + relative(dist, file).split(sep).join('/').replace(/index\.html$/, '');

/** Built file for a URL path, or null. */
const target = (path) => {
    const clean = decodeURIComponent(path);
    for (const candidate of [clean, clean + 'index.html', clean + '/index.html', clean + '.html']) {
        const file = join(dist, candidate);
        if (existsSync(file) && statSync(file).isFile()) {
            return file;
        }
    }
    return null;
};

const ids = new Map();
const idsOf = (file) => {
    if (!ids.has(file)) {
        ids.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
    }
    return ids.get(file);
};

let broken = 0;

for (const file of files(dist)) {
    const base = new URL(pageUrl(file), 'http://site');
    // Only links inside the page content and the site chrome; skip the search/runtime assets.
    for (const [, href] of readFileSync(file, 'utf8').matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
        if (/^(https?:|mailto:|tel:|javascript:)/.test(href) || href.startsWith('/_astro/') || href.startsWith('/pagefind/')) {
            continue;
        }

        const url = new URL(href.replaceAll('&amp;', '&'), base);
        const page = url.hash && url.pathname === base.pathname && !href.startsWith('/') && !href.includes('/')
            ? file
            : target(url.pathname);

        let problem = null;
        if (page === null) {
            problem = 'missing page';
        } else if (url.hash && !idsOf(page).has(decodeURIComponent(url.hash.slice(1)))) {
            problem = 'missing anchor';
        }

        if (problem !== null) {
            broken++;
            console.log(`${pageUrl(file)}: ${href} → ${url.pathname}${url.hash} (${problem})`);
        }
    }
}

console.log(broken === 0 ? 'OK: no broken internal links' : `${broken} broken internal link(s)`);
process.exit(broken === 0 ? 0 : 1);
