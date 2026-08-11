import HttpResponse from '../response';
import type { RouteHandler, RouteRequest, WorkerEnv } from '../types';
import { HttpBaseResponse, InvalidHandlerResultError } from '@almighty-shogun/http-core';

export default async function (handler: RouteHandler, request: RouteRequest, env: WorkerEnv): Promise<Response> {
    const result = await handler(request, HttpResponse, env);

    if (!(result instanceof HttpBaseResponse)) {
        throw new InvalidHandlerResultError(request.method, new URL(request.url).pathname);
    }

    return result.unwrap();
}
