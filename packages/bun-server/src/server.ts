import { compileRoutes } from './routing';
import type { CreateServerOptions } from './types';
import { HttpStatus } from '@almighty-shogun/http-core';
import { createDefaultErrorResponse, type BunServeOptions, type ErrorLike } from './internal';

export default function <WebSocketData = undefined>(options: CreateServerOptions<WebSocketData>): ReturnType<typeof Bun.serve> {
    const {
        automaticHead,
        automaticOptions,
        defaultErrorResponse,
        error,
        routeMode,
        routes,
        ...serveOptions
    } = options;

    const resolvedRoutes = routeMode === 'native'
        ? routes
        : compileRoutes(routes, { automaticHead, automaticOptions, defaultErrorResponse });

    return Bun.serve({
        ...serveOptions,
        error: error ?? ((error: ErrorLike) => createDefaultErrorResponse(
            HttpStatus.InternalServerError,
            error.message || 'Internal Server Error',
            defaultErrorResponse ?? null
        )),
        routes: resolvedRoutes
    } as BunServeOptions<WebSocketData>);
}
