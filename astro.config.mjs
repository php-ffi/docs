// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { codeThemeDark, codeThemeLight } from './src/code-theme.ts';

export default defineConfig({
    // TODO(task 04): set `site` (and `base`, if the site is not served from the root).
    // Keeps the spaces between inline text and the tags on the next line.
    compressHTML: false,
    integrations: [
        starlight({
            title: 'php-ffi',
            description: 'Preprocess and parse C headers, inspect native binaries and locate them on disk — in plain PHP.',
            favicon: '/favicon.svg',
            // The 404 page is src/pages/404.astro, set like the landing.
            disable404Route: true,
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/php-ffi' },
            ],
            customCss: [
                '@fontsource/righteous/400.css',
                '@fontsource/roboto-slab/400.css',
                '@fontsource/roboto-slab/700.css',
                '@fontsource-variable/geist-mono',
                './src/styles/tokens.css',
                './src/styles/docs.css',
            ],
            components: {
                Header: './src/components/starlight/Header.astro',
                ThemeSelect: './src/components/starlight/ThemeSelect.astro',
                PageTitle: './src/components/starlight/PageTitle.astro',
            },
            expressiveCode: {
                themes: [codeThemeDark, codeThemeLight],
                // A plain frame for every block, shell ones included: no window buttons.
                defaultProps: { frame: 'code' },
                styleOverrides: {
                    borderRadius: 'var(--radius)',
                    borderColor: 'var(--line)',
                    borderWidth: '1px',
                    codeFontFamily: 'var(--font-mono)',
                    codeFontSize: '0.85rem',
                    codeLineHeight: '1.6',
                    uiFontFamily: 'var(--font-mono)',
                    codeBackground: 'var(--bg-2)',
                    frames: {
                        editorTabBarBackground: 'var(--bg-2)',
                        editorActiveTabBackground: 'var(--bg-2)',
                        editorActiveTabIndicatorTopColor: 'var(--c-orange)',
                        editorActiveTabIndicatorBottomColor: 'transparent',
                        editorTabBarBorderBottomColor: 'var(--line)',
                        terminalBackground: 'var(--bg-2)',
                        terminalTitlebarBackground: 'var(--bg-2)',
                        terminalTitlebarBorderBottomColor: 'var(--line)',
                        frameBoxShadowCssValue: 'none',
                        inlineButtonBackground: 'var(--fg)',
                        inlineButtonForeground: 'var(--fg)',
                        inlineButtonBorder: 'var(--line)',
                    },
                },
            },
            // One group per section; src/routeData.ts shows the group of the current page only.
            // The pages are listed explicitly: the order is part of the documentation —
            // the main use cases first, reference material (errors, limitations) last.
            routeMiddleware: './src/routeData.ts',
            sidebar: [
                {
                    label: 'Parser',
                    items: [
                        { slug: 'parser', label: 'Overview' },
                        { slug: 'parser/usage' },
                        { slug: 'parser/presets' },
                        { slug: 'parser/errors' },
                        { slug: 'parser/customizing' },
                        { slug: 'parser/ast' },
                        { slug: 'parser/limitations' },
                    ],
                },
                {
                    label: 'Preprocessor',
                    items: [
                        { slug: 'preprocessor', label: 'Overview' },
                        { slug: 'preprocessor/usage' },
                        { slug: 'preprocessor/macros' },
                        { slug: 'preprocessor/includes' },
                        { slug: 'preprocessor/directives' },
                        { slug: 'preprocessor/with-parser' },
                        { slug: 'preprocessor/diagnostics' },
                        { slug: 'preprocessor/limitations' },
                    ],
                },
                {
                    label: 'Reflection Library',
                    items: [
                        { slug: 'reflection-library', label: 'Overview' },
                        { slug: 'reflection-library/library-info' },
                        { slug: 'reflection-library/exports' },
                        { slug: 'reflection-library/imports' },
                        { slug: 'reflection-library/dumping' },
                        { slug: 'reflection-library/errors' },
                        { slug: 'reflection-library/formats' },
                    ],
                },
                {
                    label: 'Utilities',
                    items: [
                        { slug: 'utils', label: 'Overview' },
                        { slug: 'utils/env', label: 'Env' },
                        { slug: 'utils/location', label: 'Location' },
                        { slug: 'utils/work-directory', label: 'Work Directory' },
                    ],
                },
            ],
        }),
    ],
});
