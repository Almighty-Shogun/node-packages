import HttpResponse from '../response';
import type { WorkerEnv } from './env';
import type { Arrayable, Promisable } from '@almighty-shogun/utils';
import type { HttpBaseResponse, HttpMethod } from '@almighty-shogun/http-core';

type PathSegmentParam<Segment extends string> = Segment extends `:${infer Name}` ? Name : never;

export type RouteParams<Path extends string> = Path extends `${infer Segment}/${infer Rest}`
    ? Record<PathSegmentParam<Segment>, string> & RouteParams<Rest>
    : Record<PathSegmentParam<Path>, string>;

export type RouteRequest<Path extends string = string> = Request & {
    readonly params: RouteParams<Path>;
    readonly ctx: ExecutionContext;
};

export type RouteHandler<Path extends string = string> = (
    request: RouteRequest<Path>,
    response: typeof HttpResponse,
    env: WorkerEnv
) => Promisable<HttpBaseResponse>;

export type RouteDefinition<Path extends string = string, Method extends HttpMethod = HttpMethod> = {
    readonly path: Path;
    readonly method: Method;
    readonly handler: RouteHandler<Path>;
};

export type RouteExport = Arrayable<RouteDefinition<any>>;

export type RouteCollection = Record<string, RouteExport>;

export type CompiledRoute = {
    readonly path: string;
    readonly segments: readonly string[];
    readonly methods: ReadonlyMap<HttpMethod, RouteHandler>;
};

export type CompiledRouteCollection = readonly CompiledRoute[];

export type RouteMatch = {
    readonly route: CompiledRoute;
    readonly params: Record<string, string>;
};
