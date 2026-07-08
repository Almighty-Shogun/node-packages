---
outline: deep

params:
    - name: headers
      description: Response headers.
      type: HeadersInit
      optional: true

returns: A `404 Not Found` response with an empty body.
---

# NotFoundHttpResponse

Creates an empty `404 Not Found` response. Use it for missing resources when no JSON or text error payload is needed.

## Importing

```ts
import { NotFoundHttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { NotFoundHttpResponse } from '@almighty-shogun/bun-server';

const response = new NotFoundHttpResponse();
```

<FrontmatterDocs/>

## Type signature

```ts
declare class NotFoundHttpResponse extends HttpBaseResponse {
    constructor(headers?: HeadersInit);
}
```
