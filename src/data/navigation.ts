// Sections of the documentation: header links of the docs pages and the
// package shown above the page title. `prefix` is the start of a page id.

export interface Section {
    label: string;
    prefix: string;
    /** Composer package(s) the section documents. */
    package: string;
    /** Shown in the header. */
    header: boolean;
}

export const sections: Section[] = [
    { label: 'Parser', prefix: 'parser', package: 'ffi/c-parser', header: true },
    { label: 'Preprocessor', prefix: 'preprocessor', package: 'ffi/preprocessor', header: true },
    { label: 'Reflection', prefix: 'reflection-library', package: 'ffi/reflection-library', header: true },
    { label: 'Utilities', prefix: 'utils', package: 'ffi/env · ffi/location', header: true },
    { label: 'Env', prefix: 'utils/env', package: 'ffi/env', header: false },
    { label: 'Location', prefix: 'utils/location', package: 'ffi/location', header: false },
];

/** The most specific section of a page. */
export const sectionOf = (id: string): Section | undefined =>
    sections
        .filter((section) => id === section.prefix || id.startsWith(section.prefix + '/'))
        .sort((a, b) => b.prefix.length - a.prefix.length)[0];
