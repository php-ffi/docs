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
            routeMiddleware: './src/routeData.ts',
            sidebar: [
                { label: 'Parser', items: [{ autogenerate: { directory: 'parser' } }] },
                { label: 'Preprocessor', items: [{ autogenerate: { directory: 'preprocessor' } }] },
                { label: 'Reflection Library', items: [{ autogenerate: { directory: 'reflection-library' } }] },
                {
                    label: 'Utilities',
                    items: [
                        { slug: 'utils', label: 'Overview' },
                        { label: 'Env', items: [{ autogenerate: { directory: 'utils/env' } }] },
                        { label: 'Location', items: [{ autogenerate: { directory: 'utils/location' } }] },
                        { label: 'Work Directory', items: [{ autogenerate: { directory: 'utils/work-directory' } }] },
                    ],
                },
            ],
        }),
    ],
});
