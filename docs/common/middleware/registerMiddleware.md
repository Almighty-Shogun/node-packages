---
outline: deep

params:
    - name: router
      description: The Vue Router instance to install the guard on.
      type: Router

    - name: options
      description: Middleware that should run on every navigation, and the routes it should not run on.
      type: RegisterMiddlewareOptions
      optional: true

returns: A function that removes the guard again.
---

# registerMiddleware

Installs the guard that runs route middleware. Call it once, after the router is created and before the application mounts.

Without it, middleware placed in `meta.middleware` is inert: the definitions are valid and typed, but nothing runs them.

## Importing

```ts
import { registerMiddleware } from '@almighty-shogun/common';
```

## Usage

The router file is the natural home, since it already owns the router instance.

```ts
import { routes } from './routes';
import { createRouter, createWebHistory } from 'vue-router';
import { registerMiddleware } from '@almighty-shogun/common';

export const router = createRouter({
    history: createWebHistory(),
    routes
});

registerMiddleware(router);
```

Calling it from the application entry point works equally well. Anywhere is fine as long as it runs before the first navigation, which does not happen until the router is installed on an app and that app mounts.

One call covers every route. Middleware is discovered from the route records during each navigation, so routes added later with `router.addRoute()` are picked up without registering again.

## Global middleware

Middleware listed in `global` runs on every navigation, before anything a route declares. Use it for a rule that holds across the application rather than repeating it on every record.

```ts
registerMiddleware(router, { global: [auth] });
```

`except` names routes the global middleware should not run on, which is how a handful of sign-in pages opt out of an application-wide rule.

```ts
registerMiddleware(router, {
    global: [auth],
    except: ['login', 'register', 'forgotPassword']
});
```

A route is exempt when **any** of its matched records is named, so naming a parent exempts everything below it. Routes only opt out of the global list; middleware they declare themselves still runs.

::: warning
`except` is checked against your route names only when the project configures Vue Router's typed routes. Without that, it accepts any string, and a renamed route leaves behind a name that silently matches nothing. Prefer [`skipMiddleware`](./defineMiddleware#opting-out-of-middleware) when a mistake would leave a route unguarded.
:::

## Ordering

Every navigation builds one list, in this order:

1. `global`, unless the route is named in `except`
2. each matched record's `meta.middleware`, outermost record first

Middleware is identified by its `name`. Repeats are dropped, keeping the first position, and anything a matched record lists in `meta.skipMiddleware` is removed from the result. The handlers then run in order until one returns something other than `undefined` or `true`.

## What it installs

A single `router.beforeEach` guard. Because it is an ordinary guard, it takes part in Vue Router's normal ordering: guards registered before it run first, and `beforeEnter` on the route itself runs after it.

## Removing the guard

The returned function removes the guard, which is mainly useful in tests.

```ts
const stop = registerMiddleware(router);

stop();
```

Calling it twice on the same router installs two guards, so every handler runs twice. Register once, or keep the returned function and remove the previous guard first.

<FrontmatterDocs/>

## Uses

- [defineMiddleware](./defineMiddleware)
- [RegisterMiddlewareOptions](../types#registermiddlewareoptions)

## Type signature

```ts
declare function registerMiddleware(
    router: Router,
    options?: RegisterMiddlewareOptions
): () => void;
```
