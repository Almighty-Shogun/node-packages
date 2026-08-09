import type { HtmlRouteDefinition } from '../types';
import type { Arrayable } from '@almighty-shogun/utils';

type HTMLBundle = Bun.HTMLBundle;

export default function <const Path extends string>(path: Arrayable<Path>, bundle: HTMLBundle): HtmlRouteDefinition<Path> {
    const routePath = Array.isArray(path) ? [...path] : path;

    return Object.freeze({
        path: routePath,
        bundle
    });
}
