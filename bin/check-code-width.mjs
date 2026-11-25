#!/usr/bin/env node
// Reports lines of fenced code blocks in .mdx pages that are longer than the limit.
//
//   node bin/check-code-width.mjs [directory under src/content/docs] [--limit=80]
//
// Exits with 1 when such lines exist.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../src/content/docs/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const args = process.argv.slice(2);
const limit = Number(args.find((a) => a.startsWith('--limit='))?.slice(8) ?? 80);
const start = join(root, args.find((a) => !a.startsWith('--')) ?? '');

const files = (dir) => readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : path.endsWith('.mdx') ? [path] : [];
});

let found = 0;

for (const file of statSync(start).isDirectory() ? files(start) : [start]) {
    let fence = null;

    readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, i) => {
        const marker = line.match(/^\s*(`{3,}|~{3,})/);

        if (marker && (fence === null || marker[1].startsWith(fence))) {
            fence = fence === null ? marker[1] : null;
            return;
        }

        if (fence !== null && [...line].length > limit) {
            found++;
            console.log(`${relative(root, file)}:${i + 1}: ${[...line].length} chars`);
        }
    });
}

console.log(found === 0 ? `OK: no code lines over ${limit} chars` : `${found} code line(s) over ${limit} chars`);
process.exit(found === 0 ? 0 : 1);
