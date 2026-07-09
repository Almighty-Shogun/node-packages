---
outline: deep

params:
    - name: headers
      description: Response headers. Include `Allow` when callers need to know which methods are supported.
      type: HeadersInit
      optional: true

returns: A `405 Method Not Allowed` response with an empty body.
---

# MethodNotAllowedHttpResponse

Creates an empty `405 Method Not Allowed` response. Use it when a route, guard, or custom handler receives a valid path but the current HTTP method is not accepted for that action.

The response class does not infer allowed methods itself. Pass an `Allow` header when the caller should know which methods are valid for the resource.

## Importing

```ts
import { MethodNotAllowedHttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { MethodNotAllowedHttpResponse } from '@almighty-shogun/bun-server';

const response = new MethodNotAllowedHttpResponse({
    Allow: 'GET, HEAD'
});
```

<FrontmatterDocs/>

## Type signature

```ts
declare class MethodNotAllowedHttpResponse extends HttpBaseResponse {
    constructor(headers?: HeadersInit);
}
```
