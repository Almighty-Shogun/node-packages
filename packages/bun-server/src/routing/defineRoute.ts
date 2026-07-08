import type { HttpMethod, RouteDefinition, RouteHandler } from '../types';

export default function <
    const Path extends string,
    const Method extends HttpMethod,
    WebSocketData = undefined>
(
    path: Path,
    method: Method,
    handler: RouteHandler<Path, WebSocketData>
): RouteDefinition<Path, Method, WebSocketData> {
    return Object.freeze({ path, method, handler });
}
