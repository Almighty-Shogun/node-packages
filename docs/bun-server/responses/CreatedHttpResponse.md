---
outline: deep

params:
    - name: headers
      description: Response headers.
      type: HeadersInit
      optional: true

returns: A `201 Created` response with an empty body.
---

# CreatedHttpResponse

Creates an empty `201 Created` response. Use it when a request successfully created a resource but the handler does not need to return a representation.

## Importing

```ts
import { CreatedHttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { CreatedHttpResponse } from '@almighty-shogun/bun-server';

const response = new CreatedHttpResponse({ Location: '/users/1' });
```

<FrontmatterDocs/>

## Type signature

```ts
declare class CreatedHttpResponse extends HttpBaseResponse {
    constructor(headers?: HeadersInit);
}
```
