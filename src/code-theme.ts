// Syntax highlighting themes built from one palette.
//
// - `codeThemeDark` / `codeThemeLight` have real colours: Expressive Code (documentation)
//   needs them to compute its UI colours, it switches them with `data-theme`.
// - `codeTheme` uses the `--code-*` CSS variables of src/styles/tokens.css, so the
//   highlighted HTML of the landing follows the theme without a second copy.
//
// Keep the hex values in sync with the `--code-*` tokens in tokens.css.

type Colors = Record<'fg' | 'comment' | 'keyword' | 'string' | 'number' | 'function' | 'type' | 'variable' | 'punct' | 'bg', string>;

export const codeColors: Record<'dark' | 'light', Colors> = {
    dark: {
        bg: '#2c2824',
        fg: '#e4dac6',
        comment: '#9a9084',
        keyword: '#f08a52',
        string: '#e9ad2c',
        number: '#e5786f',
        function: '#5cc2b8',
        type: '#f3cf7a',
        variable: '#e4dac6',
        punct: '#b8ac93',
    },
    light: {
        bg: '#e8ddcb',
        fg: '#2e2a25',
        comment: '#6e6150',
        keyword: '#a3330f',
        string: '#7a5300',
        number: '#a8261f',
        function: '#1d6b64',
        type: '#7a4a00',
        variable: '#2e2a25',
        punct: '#5a5045',
    },
};

function createTheme(name: string, type: 'dark' | 'light', c: Colors) {
    return {
        name,
        type,
        colors: {
            'editor.background': c.bg,
            'editor.foreground': c.fg,
        },
        tokenColors: [
            { settings: { foreground: c.fg } },
            { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.comment, fontStyle: 'italic' } },
            { scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.operator.new', 'keyword.control', 'meta.preprocessor', 'keyword.control.directive', 'punctuation.definition.directive'], settings: { foreground: c.keyword } },
            { scope: ['string', 'string.quoted', 'punctuation.definition.string'], settings: { foreground: c.string } },
            { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: c.number } },
            { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: c.function } },
            { scope: ['entity.name.type', 'entity.name.class', 'support.class', 'support.type', 'entity.other.inherited-class', 'entity.name.namespace', 'support.other.namespace'], settings: { foreground: c.type } },
            { scope: ['variable', 'variable.other', 'variable.parameter', 'punctuation.definition.variable'], settings: { foreground: c.variable } },
            { scope: ['punctuation', 'keyword.operator', 'meta.brace'], settings: { foreground: c.punct } },
        ],
    };
}

export const codeThemeDark = createTheme('php-ffi-dark', 'dark', codeColors.dark);
export const codeThemeLight = createTheme('php-ffi-light', 'light', codeColors.light);

const cssVars = Object.fromEntries(
    Object.keys(codeColors.dark).map((key) => [key, `var(--code-${key})`]),
) as Colors;

export const codeTheme = createTheme('php-ffi', 'dark', { ...cssVars, bg: 'transparent' });
