---
outline: deep

params:
    - name: path
      description: Route path passed to Bun's typed request handler.
      type: Path

    - name: method
      description: HTTP method handled by the route.
      type: Method

    - name: handler
      description: Handler that receives the Bun request, response factory, and Bun server.
      type: RouteHandler<Path, WebSocketData>

returns: An immutable route definition that can be included in a route collection.
---

# defineRoute

Creates a typed route definition for a single path and HTTP method. Use it to describe routes before passing a collection to [`compileRoutes`](./compileRoutes) or [`createServer`](../server/createServer).

The returned object is frozen, so route definitions are treated as static configuration after creation.

## Importing

```ts
import { defineRoute } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { defineRoute } from '@almighty-shogun/bun-server';

const route = defineRoute('/users/:id', 'GET', (request, response) => {
    return response.json({ id: request.params.id });
});
```

::: tip
You can pass either `HttpMethod.Get` or the equivalent `'GET'` method string.
:::

## Route handler

The handler receives three arguments: Bun's typed `BunRequest`, which is a `Request` carrying the decoded `params` for the path; the [`HttpResponse`](../responses/HttpResponse) class with its static factory methods; and the active `Bun.Server`.

The path is a literal type, so parameter names come straight out of it. A path of `'/users/:userId/posts/:postId'` gives `params` the type `{ userId: string; postId: string }`.

Handlers must resolve to an `HttpResponse`. Returning a native `Response` throws an [`InvalidHandlerResultError`](../../http-core/errors#invalidhandlerresulterror) naming the offending method and path.

<FrontmatterDocs/>

## Uses

- [HttpMethod](../../http-core/types#httpmethod)

## Type signature

```ts
declare function defineRoute<
    const Path extends string,
    const Method extends HttpMethod,
    WebSocketData = undefined
>(
    path: Path,
    method: Method,
    handler: RouteHandler<Path, WebSocketData>
): RouteDefinition<Path, Method, WebSocketData>;
```
