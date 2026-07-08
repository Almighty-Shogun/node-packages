---
outline: deep

returns:
    - name: 'json<T>(data: T, status: HttpStatus, headers?: HeadersInit): JsonHttpResponse<T>'
      description: Creates a JSON response with `application/json; charset=utf-8`.

    - name: 'html(html: string, status: HttpStatus, headers?: HeadersInit): HtmlHttpResponse'
      description: Creates an HTML response with `text/html; charset=utf-8`.

    - name: 'text(text: string, status: HttpStatus, headers?: HeadersInit): TextHttpResponse'
      description: Creates a plain-text response with `text/plain; charset=utf-8`.

    - name: 'file(source: string | Blob, status: HttpStatus, headers?: HeadersInit, contentType?: string): FileHttpResponse'
      description: Creates a file or blob response.

    - name: 'image(source: string | Blob, status: HttpStatus, headers?: HeadersInit, contentType?: ImageContentType): FileHttpResponse'
      description: Creates an image response with a typed image content type.

    - name: 'forbidden(headers?: HeadersInit): ForbiddenHttpResponse'
      description: Creates a `403 Forbidden` response.

    - name: 'notFound(headers?: HeadersInit): NotFoundHttpResponse'
      description: Creates a `404 Not Found` response.

    - name: 'created(headers?: HeadersInit): CreatedHttpResponse'
      description: Creates a `201 Created` response.

    - name: 'noContent(headers?: HeadersInit): NoContentHttpResponse'
      description: Creates a `204 No Content` response.
---

# HttpResponse

Factory class passed into route handlers as the `response` argument. It creates the package's concrete response classes and supplies defaults for common cases, such as `200 OK` for body responses and `204 No Content` for handlers that intentionally return no body.

Use this class indirectly from route handlers in most applications. Instantiate it directly only when you need the same response helpers outside the route execution path.

## Importing

```ts
import { HttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { HttpResponse, HttpStatus } from '@almighty-shogun/bun-server';

const response = new HttpResponse();

const json = response.json({ ok: true });
const missing = response.notFound({ 'X-Reason': 'missing' });
const html = response.html('<h1>Created</h1>', HttpStatus.Created);
```

<FrontmatterDocs/>

## Type signature

```ts
declare class HttpResponse {
    json<T = unknown>(data: T, status?: HttpStatus, headers?: HeadersInit): JsonHttpResponse<T>;
    html(html: string, status?: HttpStatus, headers?: HeadersInit): HtmlHttpResponse;
    text(text: string, status?: HttpStatus, headers?: HeadersInit): TextHttpResponse;
    file(source: string | Blob, status?: HttpStatus, headers?: HeadersInit, contentType?: string): FileHttpResponse;
    image(source: string | Blob, status?: HttpStatus, headers?: HeadersInit, contentType?: ImageContentType): FileHttpResponse;
    forbidden(headers?: HeadersInit): ForbiddenHttpResponse;
    notFound(headers?: HeadersInit): NotFoundHttpResponse;
    created(headers?: HeadersInit): CreatedHttpResponse;
    noContent(headers?: HeadersInit): NoContentHttpResponse;
}
```
