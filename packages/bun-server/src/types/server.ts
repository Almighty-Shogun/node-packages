import type { RouteCollection } from './router';
import type { DefaultErrorResponse } from './http';

type BunServeOptions = Parameters<typeof Bun.serve>[0];

export type CreateServerOptions<WebSocketData = undefined> = Omit<BunServeOptions, 'routes'> & {
    routes: RouteCollection<WebSocketData>;
    automaticHead?: boolean;
    automaticOptions?: boolean;
    defaultErrorResponse?: DefaultErrorResponse;
};
