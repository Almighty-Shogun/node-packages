import type { BunRequest, Server, HTMLBundle } from 'bun';
import type { DefaultErrorResponse, HttpMethod } from './http';
import type { HttpBaseResponse, HttpResponse } from '../responses';

export type RouteHandler<Path extends string = string, WebSocketData = undefined> = (
    request: BunRequest<Path>,
    response: HttpResponse,
    server: Server<WebSocketData>
) => HttpBaseResponse | Promise<HttpBaseResponse>;

export type RouteDefinition<Path extends string = string, Method extends HttpMethod = HttpMethod, WebSocketData = undefined> = {
    readonly path: Path;
    readonly method: Method;
    readonly handler: RouteHandler<Path, WebSocketData>;
};

export type HtmlRouteDefinition<Path extends string = string> = {
    readonly path: Path | readonly Path[];
    readonly bundle: HTMLBundle;
};

export type RouteExport<WebSocketData = undefined> =
    | RouteDefinition<any, HttpMethod, WebSocketData>
    | HtmlRouteDefinition<any>
    | readonly (
        | RouteDefinition<any, HttpMethod, WebSocketData>
        | HtmlRouteDefinition<any>
    )[];

export type RouteCollection<WebSocketData = undefined> = Readonly<Record<string, RouteExport<WebSocketData>>>;

export type CompileRoutesOptions = {
    automaticHead?: boolean;
    automaticOptions?: boolean;
    defaultErrorResponse?: DefaultErrorResponse;
};
