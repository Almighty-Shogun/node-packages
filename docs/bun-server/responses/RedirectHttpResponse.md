---
outline: deep

params:
    - name: location
      description: Target URL written to the `Location` header. Relative paths are allowed when the client can resolve them.
      type: 'string | URL'

    - name: status
      description: Redirect status code.
      type: RedirectHttpStatus
      optional: true
      defaultValue: HttpStatus.Found

    - name: headers
      description: Additional response headers. The `Location` header is set from `location`.
      type: HeadersInit
      optional: true

returns: A redirect response with an empty body and a `Location` header.
---

# RedirectHttpResponse

Creates an empty redirect response and sets the `Location` header to the provided target. Use it when a route should move the client to another page or endpoint instead of returning a JSON, HTML, or file body.

The default status is `302 Found`, which is useful for temporary redirects. Pass another `RedirectHttpStatus` when the redirect semantics need to be explicit, such as `301 Moved Permanently` for permanent URL moves or `303 See Other` after a successful form submission.

## Importing

```ts
import { RedirectHttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { HttpStatus, RedirectHttpResponse } from '@almighty-shogun/bun-server';

const temporary = new RedirectHttpResponse('/login');
const permanent = new RedirectHttpResponse(
    'https://example.com/docs',
    HttpStatus.MovedPermanently,
    { 'Cache-Control': 'public, max-age=3600' }
);
```

<FrontmatterDocs/>

## Type signature

```ts
declare class RedirectHttpResponse extends HttpBaseResponse {
    constructor(
        location: string | URL,
        status?: RedirectHttpStatus,
        headers?: HeadersInit
    );
}
```
