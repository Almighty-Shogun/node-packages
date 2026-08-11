import HttpResponse from '../response';
import type { RouteHandler } from '../types';
import { HttpBaseResponse, InvalidHandlerResultError } from '@almighty-shogun/http-core';

export default async function <WebSocketData>(
    handler: RouteHandler<string, WebSocketData>,
    request: Parameters<RouteHandler<string, WebSocketData>>[0],
    server: Parameters<RouteHandler<string, WebSocketData>>[2]
): Promise<Response> {
    const result = await handler(request, HttpResponse, server);

    if (!(result instanceof HttpBaseResponse)) {
        throw new InvalidHandlerResultError(request.method, new URL(request.url).pathname);
    }

    return result.unwrap();
}
