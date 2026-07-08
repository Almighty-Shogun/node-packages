---
outline: deep

params:
    - name: headers
      description: Response headers.
      type: HeadersInit
      optional: true

returns: A `403 Forbidden` response with an empty body.
---

# ForbiddenHttpResponse

Creates an empty `403 Forbidden` response for authenticated or authorization-sensitive handlers that need to deny access without returning a response body.

## Importing

```ts
import { ForbiddenHttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { ForbiddenHttpResponse } from '@almighty-shogun/bun-server';

const response = new ForbiddenHttpResponse();
```

<FrontmatterDocs/>

## Type signature

```ts
declare class ForbiddenHttpResponse extends HttpBaseResponse {
    constructor(headers?: HeadersInit);
}
```
