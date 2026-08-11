import HttpResponse from '../response';
import type { CompileRoutesOptions, RouteCollection, RouteHandler } from '../types';
import type { CompiledRouteCollection, BunRequest, HTMLBundle, Server } from '../internal';
import { ConflictingRoutePathsError, DuplicateRouteError, HttpMethod, HttpStatus } from '@almighty-shogun/http-core';
import {
    collectRouteDefinitions, createDefaultErrorResponse, executeHandler,
    getHtmlRoutePaths, getRoutePattern, isHtmlRouteDefinition
} from '../internal';

const httpMethodOrder: readonly HttpMethod[] = [
    HttpMethod.Get,
    HttpMethod.Head,
    HttpMethod.Post,
    HttpMethod.Put,
    HttpMethod.Patch,
    HttpMethod.Delete,
    HttpMethod.Options
];

export default function <WebSocketData = undefined>(
    collection: RouteCollection<WebSocketData>,
    options: CompileRoutesOptions = {}
): CompiledRouteCollection<WebSocketData> {
    const automaticHead = options.automaticHead ?? true;
    const automaticOptions = options.automaticOptions ?? true;
    const defaultErrorResponse = options.defaultErrorResponse ?? null;
    const definitions = collectRouteDefinitions(collection);

    const routePatterns = new Map<string, string>();
    const htmlRoutes = new Map<string, HTMLBundle>();
    const groupedRoutes = new Map<string, Map<HttpMethod, RouteHandler<string, WebSocketData>>>();

    for (const definition of definitions) {
        if (isHtmlRouteDefinition(definition)) {
            for (const path of getHtmlRoutePaths(definition)) {
                const routePattern = getRoutePattern(path);

                const existingPath = routePatterns.get(routePattern);

                if (existingPath && existingPath !== path) {
                    throw new ConflictingRoutePathsError(existingPath, path);
                }

                if (htmlRoutes.has(path)) {
                    throw new Error(`Duplicate HTML route: ${path}`);
                }

                if (groupedRoutes.has(path)) {
                    throw new Error(`Route path "${path}" cannot be both an HTML route and a method route.`);
                }

                routePatterns.set(routePattern, path);
                htmlRoutes.set(path, definition.bundle);
            }

            continue;
        }

        const routePattern = getRoutePattern(definition.path);
        const existingPath = routePatterns.get(routePattern);

        if (existingPath && existingPath !== definition.path) {
            throw new ConflictingRoutePathsError(existingPath, definition.path);
        }

        if (htmlRoutes.has(definition.path)) {
            throw new Error(`Route path "${definition.path}" cannot be both an HTML route and a method route.`);
        }

        routePatterns.set(routePattern, definition.path);

        const methods = groupedRoutes.get(definition.path) ?? new Map();

        if (methods.has(definition.method)) {
            throw new DuplicateRouteError(definition.method, definition.path);
        }

        groupedRoutes.set(definition.path, methods);
        methods.set(definition.method, definition.handler);
    }

    const compiledRoutes: CompiledRouteCollection<WebSocketData> = {};

    for (const [path, bundle] of htmlRoutes) {
        compiledRoutes[path] = bundle;
    }

    for (const [path, methods] of groupedRoutes) {
        compiledRoutes[path] = async (request: BunRequest, server: Server<WebSocketData>) => {
            const method = request.method.toUpperCase() as HttpMethod;
            const handler = methods.get(method);

            if (handler) {
                return executeHandler(handler, request, server);
            }

            const getHandler = methods.get(HttpMethod.Get);

            if (automaticHead && method === HttpMethod.Head && getHandler) {
                const getResponse = await executeHandler(getHandler, request, server);

                return new Response(null, {
                    status: getResponse.status,
                    statusText: getResponse.statusText,
                    headers: getResponse.headers
                });
            }

            const allowedMethods = new Set(methods.keys());

            if (automaticHead && methods.has(HttpMethod.Get)) {
                allowedMethods.add(HttpMethod.Head);
            }

            if (automaticOptions) {
                allowedMethods.add(HttpMethod.Options);
            }

            const allow = httpMethodOrder
                .filter((allowedMethod) => allowedMethods.has(allowedMethod))
                .join(', ');

            if (automaticOptions && method === HttpMethod.Options) {
                return HttpResponse.noContent({ headers: { Allow: allow } }).unwrap();
            }

            return createDefaultErrorResponse(
                HttpStatus.MethodNotAllowed,
                'Method Not Allowed',
                defaultErrorResponse,
                { Allow: allow }
            );
        };
    }

    return compiledRoutes;
}
