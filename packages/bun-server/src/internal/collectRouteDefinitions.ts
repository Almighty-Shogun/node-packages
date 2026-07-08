import type { HttpMethod, RouteCollection, RouteDefinition } from '../types';

type AnyRouteDefinition<WebSocketData = undefined> = RouteDefinition<string, HttpMethod, WebSocketData>;

export default function <WebSocketData>(routes: RouteCollection<WebSocketData>): AnyRouteDefinition<WebSocketData>[] {
    if (!routes || typeof routes !== 'object' || Array.isArray(routes)) {
        throw new TypeError('Routes must be an imported route collection object.');
    }

    const entries = Object.entries(routes)
        .sort(([left], [right]) => left.localeCompare(right));

    if (entries.length === 0) {
        throw new Error('The route collection does not export any routes.');
    }

    let definitions: AnyRouteDefinition<WebSocketData>[] = [];

    for (const [exportName, exportedRoutes] of entries) {
        const routeDefinitions = Array.isArray(exportedRoutes) ? exportedRoutes : [exportedRoutes];

        if (routeDefinitions.length === 0) {
            throw new Error(`Route export "${exportName}" cannot be an empty array.`);
        }

        for (const definition of routeDefinitions) {
            definitions = [...definitions, definition];
        }
    }

    return definitions;
}
