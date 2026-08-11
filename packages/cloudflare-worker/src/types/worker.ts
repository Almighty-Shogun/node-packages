import type { WorkerEnv } from './env';
import type { RouteCollection } from './router';
import type { ScheduledCollection } from './scheduled';
import type { Nullable, Promisable, Undefinable } from '@almighty-shogun/utils';
import type { DefaultErrorResponse, HttpBaseResponse } from '@almighty-shogun/http-core';

export type AssetsBinding = {
    fetch(request: Request): Promise<Response>;
};

export type EnvAssetsBinding = {
    [Key in keyof WorkerEnv]: WorkerEnv[Key] extends AssetsBinding ? Key : never;
}[keyof WorkerEnv];

export type WorkerErrorHandler = (
    error: unknown,
    request: Request,
    env: WorkerEnv
) => Promisable<Nullable<HttpBaseResponse>>;

export type CreateWorkerOptions = {
    routes: RouteCollection;
    assets?: Undefinable<EnvAssetsBinding>;
    scheduled?: Undefinable<ScheduledCollection>;
    automaticHead?: Undefinable<boolean>;
    automaticOptions?: Undefinable<boolean>;
    defaultErrorResponse?: Undefinable<DefaultErrorResponse>;
    onError?: Undefinable<WorkerErrorHandler>;
};

export type WorkerModule = {
    fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext): Promise<Response>;
    scheduled(controller: ScheduledController, env: WorkerEnv, ctx: ExecutionContext): Promise<void>;
};
