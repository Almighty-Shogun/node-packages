import splitPath from './splitPath';
import type { Nullable } from '@almighty-shogun/utils';
import type { CompiledRouteCollection, RouteMatch } from '../types';

function matchSegments(pattern: readonly string[], segments: readonly string[]): Nullable<Record<string, string>> {
    if (pattern.length !== segments.length) {
        return null;
    }

    const params: Record<string, string> = {};

    for (let index = 0; index < pattern.length; index++) {
        const patternSegment = pattern[index] as string;
        const segment = segments[index] as string;

        if (patternSegment.startsWith(':')) {
            params[patternSegment.slice(1)] = decodeURIComponent(segment);

            continue;
        }

        if (patternSegment !== segment) {
            return null;
        }
    }

    return params;
}

export default function (routes: CompiledRouteCollection, pathname: string): Nullable<RouteMatch> {
    const segments = splitPath(pathname);

    for (const route of routes) {
        const params = matchSegments(route.segments, segments);

        if (params) {
            return { route, params };
        }
    }

    return null;
}
