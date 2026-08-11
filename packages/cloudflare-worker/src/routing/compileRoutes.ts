import { collectRouteDefinitions, compareRoutes, getRoutePattern, splitPath } from '../internal';
import type { CompiledRoute, CompiledRouteCollection, RouteCollection, RouteHandler } from '../types';
import { ConflictingRoutePathsError, DuplicateRouteError, HttpMethod } from '@almighty-shogun/http-core';

export default function (collection: RouteCollection): CompiledRouteCollection {
    const definitions = collectRouteDefinitions(collection);

    const routePatterns = new Map<string, string>();
    const groupedRoutes = new Map<string, Map<HttpMethod, RouteHandler>>();

    for (const definition of definitions) {
        const segments = splitPath(definition.path);
        const routePattern = getRoutePattern(segments);
        const existingPath = routePatterns.get(routePattern);

        if (existingPath && existingPath !== definition.path) {
            throw new ConflictingRoutePathsError(existingPath, definition.path);
        }

        routePatterns.set(routePattern, definition.path);

        const methods = groupedRoutes.get(definition.path) ?? new Map();

        if (methods.has(definition.method)) {
            throw new DuplicateRouteError(definition.method, definition.path);
        }

        groupedRoutes.set(definition.path, methods);
        methods.set(definition.method, definition.handler);
    }

    const compiledRoutes: CompiledRoute[] = [];

    for (const [path, methods] of groupedRoutes) {
        compiledRoutes.push({
            path,
            segments: splitPath(path),
            methods
        });
    }

    return compiledRoutes.sort(compareRoutes);
}
