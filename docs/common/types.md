---
outline: deep
---

# Types

Shared TypeScript types exported by `@almighty-shogun/common`.

Some signatures reuse utility types from [`@almighty-shogun/utils`](../utils/types): [`Promisable`](../utils/types#promisable) and [`Undefinable`](../utils/types#undefinable).

Composable return shapes such as `UseOpen` and `UseDataTable` are not exported. Annotate with `ReturnType<typeof useOpen>` when a name is needed.

## MiddlewareDefinition

A named middleware, created by [`defineMiddleware()`](./middleware/defineMiddleware) and placed in a route's `meta.middleware`. The object is frozen, so the same definition can be shared across as many routes as needed.

The `name` identifies it: middleware sharing a name is treated as the same middleware when collapsing repeats and when applying `skipMiddleware`.

```ts
type MiddlewareDefinition<Name extends string = string> = {
    readonly name: Name;
    readonly handler: MiddlewareHandler;
};
```

The `Name` parameter is inferred from the string literal passed to `defineMiddleware()`, so `defineMiddleware('auth', ...)` produces `MiddlewareDefinition<'auth'>`.

## MiddlewareHandler

Runs before a route is entered, with the same two arguments a Vue Router navigation guard receives. It may be asynchronous.

```ts
type MiddlewareHandler = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized
) => Promisable<MiddlewareResult>;
```

## MiddlewareResult

What a handler returns, matching Vue Router's own guard contract. [`defineMiddleware()`](./middleware/defineMiddleware) covers what each value does.

```ts
type MiddlewareResult = void | boolean | RouteLocationRaw;
```

## RegisterMiddlewareOptions

Accepted by [`registerMiddleware()`](./middleware/registerMiddleware). `global` runs on every navigation, and `except` names the routes it should not run on.

```ts
type RegisterMiddlewareOptions = {
    global?: Undefinable<readonly MiddlewareDefinition[]>;
    except?: Undefinable<readonly NonNullable<RouteRecordName>[]>;
};
```

`RouteRecordName` is Vue Router's own type. It resolves to a union of your route names when the project configures typed routes, and to `string | symbol` when it does not, so `except` is only checked in the first case.

## RouteMeta

This package augments Vue Router's `RouteMeta` with the two fields [`registerMiddleware()`](./middleware/registerMiddleware) reads, so neither needs augmenting in your own project.

```ts
declare module 'vue-router' {
    interface RouteMeta {
        middleware?: Undefinable<readonly MiddlewareDefinition[]>;
        skipMiddleware?: Undefinable<readonly MiddlewareDefinition[]>;
    }
}
```
