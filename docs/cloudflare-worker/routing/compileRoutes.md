---
outline: deep

params:
    - name: collection
      description: Route collection whose exports hold route definitions.
      type: RouteCollection

returns: A sorted, matchable list of compiled routes grouped by path.
---

# compileRoutes

Compiles a route collection into the sorted route list the worker matches against, grouping every method registered for a path into one entry. [`createWorker()`](../worker/createWorker) calls it for you, so reach for it directly only when you want to inspect the compiled result or build your own dispatcher.

## Importing

```ts
import { compileRoutes } from '@almighty-shogun/cloudflare-worker';
```

## Usage

For small workers, pass an object directly. Each property name is only used as the collection key; the route path and HTTP method come from the route definition itself.

```ts
import {
    compileRoutes,
    defineRoute
} from '@almighty-shogun/cloudflare-worker';

const compiled = compileRoutes({
    health: defineRoute('/health', 'GET', (_, response) => {
        return response.json({ ok: true });
    })
});
```

## Route files

A route file can export a single [`defineRoute()`](./defineRoute) result or an array of definitions. Keep each in `src/routes/*.ts`, export them from `src/routes/index.ts`, and pass the namespace import to `compileRoutes()`. This keeps the worker entry point small while still making all registered routes explicit.

Exports are read in alphabetical order by key, so a barrel file of route modules compiles deterministically.

::: code-group

```ts [routes/health.ts]
import { defineRoute } from '@almighty-shogun/cloudflare-worker';

export default defineRoute('/health', 'GET', (_, response) => {
    return response.json({ ok: true });
});
```

```ts [routes/users.ts]
import { defineRoute } from '@almighty-shogun/cloudflare-worker';

export default [
    defineRoute('/users', 'GET', (_, response) => {
        return response.json([
            { id: 1, name: 'Shogun' }
        ]);
    }),

    defineRoute('/users/:id', 'GET', (request, response) => {
        return response.json({ id: request.params.id });
    }),

    defineRoute('/users', 'POST', async (request, response) => {
        return response.created(JSON.stringify(await request.json()), {
            contentType: 'application/json; charset=utf-8'
        });
    })
];
```

```ts [routes/index.ts]
export { default as users } from './users';
export { default as health } from './health';
```

```ts [index.ts]
import * as routes from './routes';
import { compileRoutes } from '@almighty-shogun/cloudflare-worker';

const compiled = compileRoutes(routes);
```

:::

::: tip
A route file can also export an array when one path has multiple supported methods. `compileRoutes()` flattens those arrays and groups every method registered for the same path into a single compiled entry.
:::

## Match order

The compiled list is ordered by specificity rather than by declaration order. At the first differing segment, a static segment sorts ahead of a parameter, so `/posts/latest` is matched before `/posts/:slug` even when the parameter route is declared first.

```ts
import {
    compileRoutes,
    defineRoute
} from '@almighty-shogun/cloudflare-worker';

const compiled = compileRoutes({
    post: defineRoute('/posts/:slug', 'GET', (_, response) => {
        return response.json({ draft: true });
    }),
    latest: defineRoute('/posts/latest', 'GET', (_, response) => {
        return response.json({ draft: false });
    })
});

compiled.map((route) => route.path);

// ['/posts/latest', '/posts/:slug']
```

## Validation

Compilation is strict and throws rather than silently dropping a route. It rejects:

- a collection that is not an object
- a collection that exports nothing
- an export whose array is empty
- a duplicate `method` and `path` pair
- two paths that differ only in parameter name, such as `/users/:id` and `/users/:userId`

At request time, a handler that returns anything other than an [`HttpResponse`](../responses/HttpResponse) throws an [`InvalidHandlerResultError`](../../http-core/errors#invalidhandlerresulterror) carrying the offending method and pathname.

<FrontmatterDocs/>

## Type signature

```ts
declare function compileRoutes(
    collection: RouteCollection
): CompiledRouteCollection;
```
