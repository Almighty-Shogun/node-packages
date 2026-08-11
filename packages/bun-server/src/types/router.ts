import HttpResponse from '../response';
import type { BunRequest, HTMLBundle, Server } from '../internal';
import type { Arrayable, Promisable, Undefinable } from '@almighty-shogun/utils';
import type { DefaultErrorResponse, HttpBaseResponse, HttpMethod } from '@almighty-shogun/http-core';

export type RouteHandler<Path extends string = string, WebSocketData = undefined> = (
    request: BunRequest<Path>,
    response: typeof HttpResponse,
    server: Server<WebSocketData>
) => Promisable<HttpBaseResponse>;

export type RouteDefinition<Path extends string = string, Method extends HttpMethod = HttpMethod, WebSocketData = undefined> = {
    readonly path: Path;
    readonly method: Method;
    readonly handler: RouteHandler<Path, WebSocketData>;
};

export type HtmlRouteDefinition<Path extends string = string> = {
    readonly path: Arrayable<Path>;
    readonly bundle: HTMLBundle;
};

export type RouteExport<WebSocketData = undefined> = Arrayable<
    | RouteDefinition<any, HttpMethod, WebSocketData>
    | HtmlRouteDefinition<any>
>;

export type RouteCollection<WebSocketData = undefined> = Record<string, RouteExport<WebSocketData>>;

export type CompileRoutesOptions = {
    automaticHead?: Undefinable<boolean>;
    automaticOptions?: Undefinable<boolean>;
    defaultErrorResponse?: Undefinable<DefaultErrorResponse>;
};
