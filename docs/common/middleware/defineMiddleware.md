---
outline: deep

params:
    - name: name
      description: Identifies the middleware. Two definitions sharing a name are treated as one when collapsing repeats and when skipping.
      type: string

    - name: handler
      description: Runs before the route is entered, with the same arguments a navigation guard receives.
      type: MiddlewareHandler

returns: A frozen [`MiddlewareDefinition`](../types#middlewaredefinition) to place in a route's `meta.middleware`.
---

# defineMiddleware

Creates a named piece of middleware that runs before a route is entered. Attach it to a route through `meta.middleware`, and [`registerMiddleware()`](./registerMiddleware) runs it during navigation.

The handler returns nothing to continue, `false` to cancel the navigation, or a route location to redirect. That is Vue Router's own guard contract, so middleware composes with any guard already installed.

## Importing

```ts
import { defineMiddleware } from '@almighty-shogun/common';
```

## Usage

Give each middleware its own file and export it as the default.

::: code-group

```ts [middleware/auth.ts]
import { useSession } from '../composables/useSession';
import { defineMiddleware } from '@almighty-shogun/common';

export default defineMiddleware('auth', () => {
    const { isAuthenticated } = useSession();

    if (!isAuthenticated.value) {
        return { name: 'login' };
    }
});
```

```ts [router/routes.ts]
import auth from '../middleware/auth';

export const routes = [
    {
        path: '/admin',
        component: () => import('../views/Admin.vue'),
        meta: { middleware: [auth] }
    }
];
```

:::

A route holds the imported definition rather than a name string, so a typo is a compile error and unused middleware is dropped from the bundle.

## Nested routes

Middleware is collected from **every matched route record**, outermost first, so a parent always runs before its children.

```ts
const routes = [
    {
        path: '/admin',
        meta: { middleware: [auth] },
        children: [
            {
                path: 'users',
                meta: { middleware: [auth, admin] },
                children: [
                    { path: ':id', meta: { middleware: [audit] } }
                ]
            }
        ]
    }
];
```

Visiting `/admin/users/42` runs `auth`, then `admin`, then `audit`. `auth` is listed by two records but runs once, at its first position.

::: tip
Collection reads each record's own array rather than the merged `meta`, which is what lets a parent's middleware survive. A child declaring `middleware` does not replace its parent's, unlike other `meta` arrays, which [`useRouteMeta()`](../router/useRouteMeta) replaces wholesale.
:::

## Names and repeats

The `name` is what identifies a middleware. Two definitions sharing a name are treated as the same middleware, so the second is dropped from the chain and skipping either skips both.

This is why the same middleware can be declared on a parent and a child without running twice, and it is what makes factories work.

```ts
import { defineMiddleware } from '@almighty-shogun/common';

export default (permission: string) => defineMiddleware(
    `permission:${permission}`,
    () => {
        // ...
    }
);
```

Each call builds a new object, so identity would treat every call as unrelated. Names make them comparable: two different permissions are two different middleware, and the same permission asked for twice is one.

```ts
import hasPermission from '../middleware/hasPermission';

export const routes = [
    {
        path: '/admin/users',
        meta: { middleware: [hasPermission('users:view')] },
        children: [
            {
                path: ':id/edit',
                meta: { middleware: [hasPermission('users:edit')] }
            }
        ]
    }
];
```

Visiting `/admin/users/7/edit` checks `users:view`, then `users:edit`. Had both records asked for the same permission, it would be checked once.

A factory file default-exports the function, whereas a plain middleware file default-exports the definition itself, so the two are used differently at the call site.

```ts
import auth from '../middleware/auth';
import hasPermission from '../middleware/hasPermission';

meta: { middleware: [auth, hasPermission('users:view')] }
```

::: warning
Give every middleware a distinct name, and build a factory's name from its argument as above. Two unrelated middleware sharing a name silently collapse into one.
:::

## What a handler returns

Returning nothing, or `true`, lets the navigation continue to the next middleware and then to the route. That is the common case, so a handler that only needs to allow the navigation can end without a `return` at all.

Returning `false` cancels the navigation. The browser stays on the route it was already showing, and the address bar is left untouched.

Returning a route location redirects there instead. Anything Vue Router accepts works, so a path such as `'/billing'` and a named location such as `{ name: 'login' }` are both fine.

The first handler to return anything other than `undefined` or `true` ends the chain, and the middleware after it never runs.

```ts
export default defineMiddleware('subscribed', async () => {
    const subscription = await loadSubscription();

    if (!subscription) {
        return '/billing';
    }

    if (subscription.isSuspended) {
        return false;
    }
});
```

## Opting out of middleware

A route can drop middleware it would otherwise inherit, by listing the definition in `meta.skipMiddleware`.

```ts
{
    path: '/admin/status',
    meta: { skipMiddleware: [admin] }
}
```

This works against anything in the chain: middleware declared by a parent record, and middleware registered globally through [`registerMiddleware()`](./registerMiddleware). Only the listed definitions are removed, so the rest of the chain still runs.

```ts
{
    path: '/public',
    meta: { middleware: [guest], skipMiddleware: [auth] }
}
```

Skips are collected from every matched record and applied to the whole chain, so they are not directional. A child can drop something its parent declared, and a parent can equally drop something declared by a child below it.

::: warning
A `skipMiddleware` on a parent therefore reaches every route beneath it. Put the skip on the specific record that should opt out, rather than on a parent, unless removing that middleware from the whole subtree is what you mean.
:::

`skipMiddleware` holds definitions rather than name strings, so a typo is a compile error and deleting a middleware makes every skip mentioning it fail to compile. Matching is by name, as described above, so a middleware built by a factory is skipped by calling that factory again.

```ts
{
    path: '/reports/public',
    meta: { skipMiddleware: [hasPermission('reports:view')] }
}
```

## Running order

Middleware runs on **every** navigation that matches its record, not only when the record is first entered. Moving between `/admin/users` and `/admin/posts` re-runs the middleware on `/admin` both times, so a check cannot go stale while the parent stays mounted.

Handlers run one after another, and an asynchronous handler is awaited before the next begins.

A handler that throws is not the same as one returning `false`. The rejection propagates out of the guard to Vue Router's own error handling, rather than cancelling the navigation quietly, so reach for `return false` when refusing a navigation is the intended outcome.

<FrontmatterDocs/>

## Uses

- [MiddlewareDefinition](../types#middlewaredefinition)
- [MiddlewareHandler](../types#middlewarehandler)

## Type signature

```ts
declare function defineMiddleware<const Name extends string>(
    name: Name,
    handler: MiddlewareHandler
): MiddlewareDefinition<Name>;
```
