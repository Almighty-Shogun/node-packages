---
outline: deep

params:
    - name: body
      description: Response body passed to the native `Response` constructor.
      type: BodyInit | null

    - name: status
      description: HTTP status code for the response.
      type: HttpStatus

    - name: headers
      description: Headers copied into a new `Headers` instance.
      type: HeadersInit
      optional: true

    - name: contentType
      description: Content type written to the `Content-Type` header when provided.
      type: string
      optional: true

returns: A `Response` subclass with status, headers, and optional content type applied.
---

# HttpBaseResponse

Abstract base class used by the package's concrete response classes. It extends the platform `Response` object and centralizes header creation and `Content-Type` assignment.

Most application code should use `HttpResponse` factory methods or concrete response classes instead of extending this class directly.

## Importing

```ts
import { HttpBaseResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { HttpBaseResponse, HttpStatus } from '@almighty-shogun/bun-server';

class XmlHttpResponse extends HttpBaseResponse {
    constructor(xml: string) {
        super(xml, HttpStatus.Ok, undefined, 'application/xml; charset=utf-8');
    }
}
```

<FrontmatterDocs/>

## Type signature

```ts
declare abstract class HttpBaseResponse extends Response {
    protected constructor(
        body: BodyInit | null,
        status: HttpStatus,
        headers?: HeadersInit,
        contentType?: string
    );
}
```

