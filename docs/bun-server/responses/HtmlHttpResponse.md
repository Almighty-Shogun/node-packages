---
outline: deep

params:
    - name: html
      description: HTML string used as the response body.
      type: string

    - name: status
      description: HTTP status code for the response.
      type: HttpStatus

    - name: headers
      description: Response headers.
      type: HeadersInit
      optional: true

returns: An HTML `Response` subclass.
---

# HtmlHttpResponse

Creates an HTML response and sets `Content-Type` to `text/html; charset=utf-8`.

## Importing

```ts
import { HtmlHttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { HtmlHttpResponse, HttpStatus } from '@almighty-shogun/bun-server';

const response = new HtmlHttpResponse('<h1>Hello</h1>', HttpStatus.Ok);
```

<FrontmatterDocs/>

## Type signature

```ts
declare class HtmlHttpResponse extends HttpBaseResponse {
    constructor(html: string, status: HttpStatus, headers?: HeadersInit);
}
```

