import type { HTMLBundle } from 'bun';
import type { HtmlRouteDefinition } from '../types';

export default function <const Path extends string>(path: Path | readonly Path[], bundle: HTMLBundle): HtmlRouteDefinition<Path> {
    const routePath = Array.isArray(path) ? Object.freeze([...path]) : path;

    return Object.freeze({
        path: routePath,
        bundle
    });
}
