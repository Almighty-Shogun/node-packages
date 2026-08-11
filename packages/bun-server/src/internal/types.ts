import type { Promisable } from '@almighty-shogun/utils';
import type { HttpMethod } from '@almighty-shogun/http-core';
import type { HtmlRouteDefinition, RouteDefinition } from '../types';

export type ErrorLike = Bun.ErrorLike;
export type HTMLBundle = Bun.HTMLBundle;
export type Server<WebSocketData = undefined> = Bun.Server<WebSocketData>;
export type BunRequest<Path extends string = string> = Bun.BunRequest<Path>;
export type BunServeOptions<WebSocketData = undefined> = Parameters<typeof Bun.serve<WebSocketData>>[0];

export type CollectedRouteDefinition<WebSocketData = undefined> =
    | RouteDefinition<string, HttpMethod, WebSocketData>
    | HtmlRouteDefinition;

export type CompiledRouteHandler<WebSocketData = undefined> = (
    request: BunRequest,
    server: Server<WebSocketData>
) => Promisable<Response>;

export type CompiledRouteCollection<WebSocketData = undefined> = Record<string,
    | HTMLBundle
    | CompiledRouteHandler<WebSocketData>
>;
