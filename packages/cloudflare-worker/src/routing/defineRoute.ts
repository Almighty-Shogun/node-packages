import type { HttpMethod } from '@almighty-shogun/http-core';
import type { RouteDefinition, RouteHandler } from '../types';

export default function <const Path extends string, const Method extends HttpMethod>(
    path: Path,
    method: Method,
    handler: RouteHandler<Path>
): RouteDefinition<Path, Method> {
    return Object.freeze({ path, method, handler });
}
