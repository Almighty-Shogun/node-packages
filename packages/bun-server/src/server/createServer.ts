import type { ErrorLike } from 'bun';
import { compileRoutes } from '../routing';
import { createDefaultErrorResponse } from '../internal';
import { HttpStatus, type CreateServerOptions } from '../types';

type BunServeOptions<WebSocketData = undefined> = Parameters<typeof Bun.serve<WebSocketData>>[0];

export default function <WebSocketData = undefined>(
    options: CreateServerOptions<WebSocketData>
): ReturnType<typeof Bun.serve> {
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
        : compileRoutes(routes, {
            automaticHead,
            automaticOptions,
            defaultErrorResponse
        });

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
