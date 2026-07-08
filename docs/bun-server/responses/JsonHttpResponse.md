---
outline: deep

params:
    - name: data
      description: Value serialized with `JSON.stringify()`.
      type: T

    - name: status
      description: HTTP status code for the response.
      type: HttpStatus

    - name: headers
      description: Response headers.
      type: HeadersInit
      optional: true

returns: A JSON `Response` subclass.
---

# JsonHttpResponse

Creates a JSON response by serializing `data` with `JSON.stringify()` and setting `Content-Type` to `application/json; charset=utf-8`.

## Importing

```ts
import { JsonHttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { HttpStatus, JsonHttpResponse } from '@almighty-shogun/bun-server';

const response = new JsonHttpResponse({ ok: true }, HttpStatus.Ok);
```

<FrontmatterDocs/>

## Type signature

```ts
declare class JsonHttpResponse<T = unknown> extends HttpBaseResponse {
    constructor(data: T, status: HttpStatus, headers?: HeadersInit);
}
```

