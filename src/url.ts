// Builds an internal link that respects the `base` option of astro.config.mjs.
export const url = (path = ''): string => {
    const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

    return base + path.replace(/^\//, '');
};
