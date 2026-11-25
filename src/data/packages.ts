// The packages of the toolchain. Used by the landing page; `docs` is the slug of the
// documentation section (see src/content/docs/).

export interface Package {
    title: string;
    name: string;
    php: string;
    docs: string;
    repo: string;
    summary: string;
    group: 'toolchain' | 'utilities';
}

export const packages: Package[] = [
    {
        title: 'Parser',
        name: 'ffi/c-parser',
        php: '8.1',
        docs: 'parser/',
        repo: 'https://github.com/php-ffi/c-parser',
        summary: 'Parses C23 headers — the ones you pass to FFI::cdef() — into an AST.',
        group: 'toolchain',
    },
    {
        title: 'Preprocessor',
        name: 'ffi/preprocessor',
        php: '8.1',
        docs: 'preprocessor/',
        repo: 'https://github.com/php-ffi/preprocessor',
        summary: 'Expands macros and executes the directives of a C source: #define, #if, #include, #embed.',
        group: 'toolchain',
    },
    {
        title: 'Reflection Library',
        name: 'ffi/reflection-library',
        php: '8.4',
        docs: 'reflection-library/',
        repo: 'https://github.com/php-ffi/reflection-library',
        summary: 'Reads ELF, PE and Mach-O binaries and tells what a library exports and imports.',
        group: 'toolchain',
    },
    {
        title: 'Env',
        name: 'ffi/env',
        php: '7.4',
        docs: 'utils/env/',
        repo: 'https://github.com/php-ffi/env',
        summary: 'Tells whether FFI is available in the current runtime, and why not.',
        group: 'utilities',
    },
    {
        title: 'Location',
        name: 'ffi/location',
        php: '7.4',
        docs: 'utils/location/',
        repo: 'https://github.com/php-ffi/location',
        summary: 'Resolves the physical pathname of a binary the way the OS loader does.',
        group: 'utilities',
    },
    {
        title: 'Work Directory',
        name: 'ffi/work-directory',
        php: '7.4',
        docs: 'utils/work-directory/',
        repo: 'https://github.com/php-ffi/work-directory',
        summary: 'Reads and changes the working directory of the process, thread-safe builds included.',
        group: 'utilities',
    },
];

export const github = 'https://github.com/php-ffi';
