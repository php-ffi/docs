/*
 * Every section of the documentation behaves like a site of its own: the sidebar
 * shows the group of the current section only and the pagination does not cross
 * into another section. The table of contents omits the entry for the page title.
 */
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import type { StarlightRouteData } from '@astrojs/starlight/route-data';
import { url } from './url';

type Entry = StarlightRouteData['sidebar'][number];

function hasCurrent(entry: Entry): boolean {
    return entry.type === 'link' ? entry.isCurrent : entry.entries.some(hasCurrent);
}

export const onRequest = defineRouteMiddleware((context) => {
    const route = context.locals.starlightRoute;

    if (route.toc !== undefined) {
        const items = route.toc.items.filter((item) => item.slug !== '_top');

        route.toc = items.length === 0 ? undefined : { ...route.toc, items };
    }

    const section = route.sidebar.find((entry) => entry.type === 'group' && hasCurrent(entry));

    if (section === undefined || section.type !== 'group') {
        return;
    }

    route.sidebar = section.entries;

    const prefix = url(route.id.split('/')[0] + '/');
    const { prev, next } = route.pagination;

    route.pagination = {
        prev: prev?.href.startsWith(prefix) ? prev : undefined,
        next: next?.href.startsWith(prefix) ? next : undefined,
    };
});
