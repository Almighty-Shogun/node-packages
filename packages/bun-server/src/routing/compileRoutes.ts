import { HttpMethod, HttpStatus } from '../types';
import { NoContentHttpResponse } from '../responses';
import type { BunRequest, Server, HTMLBundle } from 'bun';
import { collectRouteDefinitions, createDefaultErrorResponse, executeHandler } from '../internal';
import type { CompileRoutesOptions, HtmlRouteDefinition, RouteCollection, RouteDefinition, RouteHandler } from '../types';

const httpMethodOrder: readonly HttpMethod[] = [
    HttpMethod.Get,
    HttpMethod.Head,
    HttpMethod.Post,
    HttpMethod.Put,
    HttpMethod.Patch,
    HttpMethod.Delete,
    HttpMethod.Options
];

type MethodRouteDefinition<WebSocketData = undefined> = RouteDefinition<string, HttpMethod, WebSocketData>;

type CollectedRouteDefinition<WebSocketData = undefined> =
    | MethodRouteDefinition<WebSocketData>
    | HtmlRouteDefinition;

type CompiledRouteHandler<WebSocketData = undefined> = (
    request: BunRequest<string>,
    server: Server<WebSocketData>
) => Response | Promise<Response>;

type CompiledRouteCollection<WebSocketData = undefined> = Record<string,
    | HTMLBundle
    | CompiledRouteHandler<WebSocketData>
>;

function isHtmlRouteDefinition<WebSocketData>(
    definition: CollectedRouteDefinition<WebSocketData>
): definition is HtmlRouteDefinition {
    return 'bundle' in definition;
}

function getHtmlRoutePaths(definition: HtmlRouteDefinition): readonly string[] {
    const paths = Array.isArray(definition.path) ? definition.path : [definition.path];

    if (paths.length === 0) {
        throw new Error('HTML route path array cannot be empty.');
    }

    return paths;
}

function getRoutePattern(path: string): string {
    return path
        .split('/')
        .map((segment) => segment.startsWith(':') ? ':' : segment)
        .join('/');
}

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
                    throw new Error(`Conflicting route paths: "${existingPath}" and "${path}".`);
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
            throw new Error(`Conflicting route paths: "${existingPath}" and "${definition.path}".`);
        }

        if (htmlRoutes.has(definition.path)) {
            throw new Error(`Route path "${definition.path}" cannot be both an HTML route and a method route.`);
        }

        routePatterns.set(routePattern, definition.path);

        const methods = groupedRoutes.get(definition.path) ?? new Map();

        if (methods.has(definition.method)) {
            throw new Error(`Duplicate route: ${definition.method} ${definition.path}`);
        }

        groupedRoutes.set(definition.path, methods);
        methods.set(definition.method, definition.handler);
    }

    const compiledRoutes: CompiledRouteCollection<WebSocketData> = {};

    for (const [path, bundle] of htmlRoutes) {
        compiledRoutes[path] = bundle;
    }

    for (const [path, methods] of groupedRoutes) {
        compiledRoutes[path] = async (request: BunRequest<string>, server: Server<WebSocketData>) => {
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
