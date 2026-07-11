import type { RouteCollection } from './router';
import type { DefaultErrorResponse } from './http';

type BunServeOptions<WebSocketData = undefined> = Parameters<typeof Bun.serve<WebSocketData>>[0];

export type NativeRouteCollection<WebSocketData = undefined> = NonNullable<BunServeOptions<WebSocketData>['routes']>;

export type RouteMode = 'defined' | 'native';

type CreateServerBaseOptions<WebSocketData = undefined> = Omit<BunServeOptions<WebSocketData>, 'routes'> & {
    defaultErrorResponse?: DefaultErrorResponse;
};

export type CreateServerDefinedOptions<WebSocketData = undefined> = CreateServerBaseOptions<WebSocketData> & {
    routeMode?: 'defined';
    routes: RouteCollection<WebSocketData>;
    automaticHead?: boolean;
    automaticOptions?: boolean;
};

export type CreateServerNativeOptions<WebSocketData = undefined> = CreateServerBaseOptions<WebSocketData> & {
    routeMode: 'native';
    routes: NativeRouteCollection<WebSocketData>;
    automaticHead?: never;
    automaticOptions?: never;
};

export type CreateServerOptions<WebSocketData = undefined> =
    | CreateServerDefinedOptions<WebSocketData>
    | CreateServerNativeOptions<WebSocketData>;
