import HttpResponse from './response';
import { compileRoutes } from './routing';
import { compileScheduled } from './scheduling';
import type { Nullable } from '@almighty-shogun/utils';
import { HttpMethod, HttpStatus } from '@almighty-shogun/http-core';
import { createDefaultErrorResponse, executeHandler, matchRoute } from './internal';
import type { AssetsBinding, CreateWorkerOptions, RouteRequest, ScheduledRun, WorkerEnv, WorkerModule } from './types';

const httpMethodOrder: readonly HttpMethod[] = [
    HttpMethod.Get,
    HttpMethod.Head,
    HttpMethod.Post,
    HttpMethod.Put,
    HttpMethod.Patch,
    HttpMethod.Delete,
    HttpMethod.Options
];

export default function (options: CreateWorkerOptions): WorkerModule {
    const {
        assets,
        automaticHead = true,
        automaticOptions = true,
        defaultErrorResponse = null,
        onError,
        routes,
        scheduled
    } = options;

    const compiledRoutes = compileRoutes(routes);
    const compiledScheduled = scheduled ? compileScheduled(scheduled) : [];

    function getAssetsBinding(env: WorkerEnv): Nullable<AssetsBinding> {
        if (!assets) {
            return null;
        }

        const binding = (env as Record<string, unknown>)[assets as string];

        return binding && typeof (binding as AssetsBinding).fetch === 'function'
            ? binding as AssetsBinding
            : null;
    }

    async function dispatch(request: Request, env: WorkerEnv, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);
        const match = matchRoute(compiledRoutes, url.pathname);

        if (!match) {
            const binding = getAssetsBinding(env);

            if (binding) {
                return binding.fetch(request);
            }

            return createDefaultErrorResponse(HttpStatus.NotFound, 'Not Found', defaultErrorResponse);
        }

        const method = request.method.toUpperCase() as HttpMethod;
        const { methods } = match.route;
        const handler = methods.get(method);

        const routeRequest = Object.assign(request, {
            params: match.params,
            ctx
        }) as RouteRequest;

        if (handler) {
            return executeHandler(handler, routeRequest, env);
        }

        const getHandler = methods.get(HttpMethod.Get);

        if (automaticHead && method === HttpMethod.Head && getHandler) {
            const getResponse = await executeHandler(getHandler, routeRequest, env);

            return new Response(null, {
                status: getResponse.status,
                statusText: getResponse.statusText,
                headers: getResponse.headers
            });
        }

        const allowedMethods = new Set(methods.keys());

        if (automaticHead && methods.has(HttpMethod.Get)) {
            allowedMethods.add(HttpMethod.Head);
        }

        if (automaticOptions) {
            allowedMethods.add(HttpMethod.Options);
        }

        const allow = httpMethodOrder
            .filter((allowedMethod) => allowedMethods.has(allowedMethod))
            .join(', ');

        if (automaticOptions && method === HttpMethod.Options) {
            return HttpResponse.noContent({ headers: { Allow: allow } }).unwrap();
        }

        return createDefaultErrorResponse(
            HttpStatus.MethodNotAllowed,
            'Method Not Allowed',
            defaultErrorResponse,
            { Allow: allow }
        );
    }

    return {
        async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext): Promise<Response> {
            try {
                return await dispatch(request, env, ctx);
            } catch (error) {
                if (onError) {
                    const result = await onError(error, request, env);

                    if (result) {
                        return result.unwrap();
                    }
                }

                return createDefaultErrorResponse(
                    HttpStatus.InternalServerError,
                    'Internal Server Error',
                    defaultErrorResponse
                );
            }
        },

        async scheduled(controller: ScheduledController, env: WorkerEnv, ctx: ExecutionContext): Promise<void> {
            const matched = compiledScheduled.find(entry => entry.cron === controller.cron);

            if (!matched) {
                return;
            }

            const run: ScheduledRun = {
                controller,
                ctx,
                cron: controller.cron
            };

            const errors: unknown[] = [];

            for (const handler of matched.handlers) {
                try {
                    await handler(run, env);
                } catch (error) {
                    errors.push(error);
                }
            }

            if (errors.length === 1) {
                throw errors[0];
            }

            if (errors.length > 1) {
                throw new AggregateError(errors, `${errors.length} scheduled tasks failed for "${controller.cron}".`);
            }
        }
    };
}
