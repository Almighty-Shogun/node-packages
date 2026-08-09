import type { RouteHandler } from '../types';
import { HttpBaseResponse } from '../responses';

export default async function <WebSocketData>(
    handler: RouteHandler<string, WebSocketData>,
    request: Parameters<RouteHandler<string, WebSocketData>>[0],
    server: Parameters<RouteHandler<string, WebSocketData>>[2]
): Promise<Response> {
    const result = await handler(request, HttpBaseResponse, server);

    if (!(result instanceof HttpBaseResponse)) {
        throw new TypeError(`Route handler for ${request.method} ${new URL(request.url).pathname} did not return an HttpBaseResponse.`);
    }

    return result.unwrap();
}
