import type { BunRequest, Server } from 'bun';
import { NoContentHttpResponse } from '../responses';
import { HttpMethod, HttpStatus } from '../types';
import { collectRouteDefinitions, createDefaultErrorResponse, executeHandler } from '../internal';
import type { CompileRoutesOptions, RouteCollection, RouteHandler } from '../types';

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
): Record<string, (
    request: BunRequest<string>,
    server: Server<WebSocketData>
) => Response | Promise<Response>> {
    const automaticHead = options.automaticHead ?? true;
    const automaticOptions = options.automaticOptions ?? true;
    const defaultErrorResponse = options.defaultErrorResponse ?? null;
    const definitions = collectRouteDefinitions(collection);

    const routePatterns = new Map<string, string>();
    const groupedRoutes = new Map<string, Map<HttpMethod, RouteHandler<string, WebSocketData>>>();

    for (const definition of definitions) {
        const routePattern = definition.path
            .split('/')
            .map((segment) => segment.startsWith(':') ? ':' : segment)
            .join('/');

        const existingPath = routePatterns.get(routePattern);

        if (existingPath && existingPath !== definition.path) {
            throw new Error(`Conflicting route paths: "${existingPath}" and "${definition.path}".`);
        }

        routePatterns.set(routePattern, definition.path);

        const methods = groupedRoutes.get(definition.path) ?? new Map();

        if (methods.has(definition.method)) {
            throw new Error(`Duplicate route: ${definition.method} ${definition.path}`);
        }

        groupedRoutes.set(definition.path, methods);
        methods.set(definition.method, definition.handler);
    }

    const compiledRoutes: Record<string, (
        request: BunRequest<string>,
        server: Server<WebSocketData>
    ) => Response | Promise<Response>> = {};

    for (const [path, methods] of groupedRoutes) {
        compiledRoutes[path] = async (request, server) => {
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
                return new NoContentHttpResponse({ Allow: allow });
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
