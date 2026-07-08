---
outline: deep

params:
    - name: text
      description: Plain text response body.
      type: string

    - name: status
      description: HTTP status code for the response.
      type: HttpStatus

    - name: headers
      description: Response headers.
      type: HeadersInit
      optional: true

returns: A plain-text `Response` subclass.
---

# TextHttpResponse

Creates a plain-text response and sets `Content-Type` to `text/plain; charset=utf-8`.

## Importing

```ts
import { HttpStatus, TextHttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { HttpStatus, TextHttpResponse } from '@almighty-shogun/bun-server';

const response = new TextHttpResponse('Accepted', HttpStatus.Accepted);
```

<FrontmatterDocs/>

## Type signature

```ts
declare class TextHttpResponse extends HttpBaseResponse {
    constructor(text: string, status: HttpStatus, headers?: HeadersInit);
}
```

