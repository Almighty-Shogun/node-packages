import type { RouteCollection } from '../types';
import type { CollectedRouteDefinition } from './types';
import { EmptyRouteCollectionError, EmptyRouteExportError, InvalidRouteCollectionError } from '@almighty-shogun/http-core';

export default function <WebSocketData>(routes: RouteCollection<WebSocketData>): CollectedRouteDefinition<WebSocketData>[] {
    if (!routes || typeof routes !== 'object' || Array.isArray(routes)) {
        throw new InvalidRouteCollectionError();
    }

    const entries = Object.entries(routes)
        .sort(([left], [right]) => left.localeCompare(right));

    if (entries.length === 0) {
        throw new EmptyRouteCollectionError();
    }

    let definitions: CollectedRouteDefinition<WebSocketData>[] = [];

    for (const [exportName, exportedRoutes] of entries) {
        const routeDefinitions = Array.isArray(exportedRoutes) ? exportedRoutes : [exportedRoutes];

        if (routeDefinitions.length === 0) {
            throw new EmptyRouteExportError(exportName);
        }

        for (const definition of routeDefinitions) {
            definitions = [...definitions, definition];
        }
    }

    return definitions;
}
