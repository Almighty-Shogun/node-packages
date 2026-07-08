---
outline: deep

params:
    - name: headers
      description: Response headers.
      type: HeadersInit
      optional: true

returns: A `204 No Content` response with an empty body.
---

# NoContentHttpResponse

Creates an empty `204 No Content` response. Use it for successful operations that intentionally return no body, such as update or delete endpoints.

## Importing

```ts
import { NoContentHttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { NoContentHttpResponse } from '@almighty-shogun/bun-server';

const response = new NoContentHttpResponse();
```

<FrontmatterDocs/>

## Type signature

```ts
declare class NoContentHttpResponse extends HttpBaseResponse {
    constructor(headers?: HeadersInit);
}
```
