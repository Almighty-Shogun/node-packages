import type { Promisable, Undefinable } from '@almighty-shogun/utils';
import type { RouteLocationNormalized, RouteLocationRaw, RouteRecordName } from 'vue-router';

export type MiddlewareResult = void | boolean | RouteLocationRaw;
export type MiddlewareHandler = (to: RouteLocationNormalized, from: RouteLocationNormalized) => Promisable<MiddlewareResult>;

export type MiddlewareDefinition<Name extends string = string> = {
    readonly name: Name;
    readonly handler: MiddlewareHandler;
};

export type RegisterMiddlewareOptions = {
    global?: Undefinable<readonly MiddlewareDefinition[]>;
    except?: Undefinable<readonly NonNullable<RouteRecordName>[]>;
};

declare module 'vue-router' {
    interface RouteMeta {
        middleware?: Undefinable<readonly MiddlewareDefinition[]>;
        skipMiddleware?: Undefinable<readonly MiddlewareDefinition[]>;
    }
}
