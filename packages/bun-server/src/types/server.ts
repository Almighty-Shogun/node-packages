import type { RouteCollection } from './router';
import type { DefaultErrorResponse } from './http';
import type { Undefinable } from '@almighty-shogun/utils';

type BunServeOptions<WebSocketData = undefined> = Parameters<typeof Bun.serve<WebSocketData>>[0];

export type NativeRouteCollection<WebSocketData = undefined> = NonNullable<BunServeOptions<WebSocketData>['routes']>;

type CreateServerBaseOptions<WebSocketData = undefined> = Omit<BunServeOptions<WebSocketData>, 'routes'> & {
    defaultErrorResponse?: Undefinable<DefaultErrorResponse>;
};

export type CreateServerDefinedOptions<WebSocketData = undefined> = CreateServerBaseOptions<WebSocketData> & {
    routeMode?: Undefinable<'defined'>;
    routes: RouteCollection<WebSocketData>;
    automaticHead?: Undefinable<boolean>;
    automaticOptions?: Undefinable<boolean>;
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
