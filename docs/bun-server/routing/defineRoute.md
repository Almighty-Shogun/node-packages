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

Creates a typed route definition for a single path and HTTP method. Use it to describe routes before passing a collection to `compileRoutes` or `createServer`.

The returned object is frozen, so route definitions are treated as static configuration after creation.

## Importing

```ts
import { defineRoute } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { defineRoute, HttpMethod } from '@almighty-shogun/bun-server';

const route = defineRoute('/users/:id', HttpMethod.Get, (request, response) => {
    return response.json({ id: request.params.id });
});
```

<FrontmatterDocs/>

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

