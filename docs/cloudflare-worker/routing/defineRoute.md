---
outline: deep

params:
    - name: path
      description: Route path. Segments beginning with a colon become named parameters.
      type: Path

    - name: method
      description: HTTP method handled by the route.
      type: Method

    - name: handler
      description: Handler that receives the route request, the response factory, and the environment.
      type: RouteHandler<Path>

returns: An immutable route definition that can be included in a route collection.
---

# defineRoute

Creates a typed route definition for a single path and HTTP method. Use it to describe routes before passing a collection to [`createWorker()`](../worker/createWorker) or [`compileRoutes()`](./compileRoutes).

The returned object is frozen, so route definitions are treated as static configuration after creation.

## Importing

```ts
import { defineRoute } from '@almighty-shogun/cloudflare-worker';
```

## Usage

```ts
import { defineRoute } from '@almighty-shogun/cloudflare-worker';

const route = defineRoute('/users/:id', 'GET', (request, response) => {
    return response.json({ id: request.params.id });
});
```

Bindings and secrets arrive as a third argument, so a route that needs none never sees the environment.

```ts
import { defineRoute } from '@almighty-shogun/cloudflare-worker';

const route = defineRoute('/config', 'GET', async (_, response, env) => {
    return response.json(await env.CACHE.get('config', 'json'));
});
```

::: tip
You can pass either `HttpMethod.Get` or the equivalent `'GET'` method string.
:::

## Route request

The first argument is the native `Request` with two additions: `params`, holding the decoded path parameters, and `ctx`, the worker's `ExecutionContext` for `waitUntil()` and `passThroughOnException()`. Everything standard is still there, so `request.headers` and `request.method` work as usual. There is no parsed URL, because `request.url` already is one as a string.

The second argument is the [`HttpResponse`](../responses/HttpResponse) class, and the third is the environment, typed as [`WorkerEnv`](../types#workerenv).

The path is a literal type, so parameter names are read straight out of it. A path of `'/users/:userId/posts/:postId'` gives `params` the type `{ userId: string; postId: string }`, and reading any other key is a compile error. Values are passed through `decodeURIComponent()`, so a request for `/tags/a%20b` reaches the handler with `a b`.

<FrontmatterDocs/>

## Uses

- [HttpMethod](../../http-core/types#httpmethod)

## Type signature

```ts
declare function defineRoute<
    const Path extends string,
    const Method extends HttpMethod
>(
    path: Path,
    method: Method,
    handler: RouteHandler<Path>
): RouteDefinition<Path, Method>;
```
