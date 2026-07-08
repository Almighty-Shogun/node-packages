---
outline: deep

params:
    - name: source
      description: File path loaded with `Bun.file()` or an existing `Blob`.
      type: string | Blob

    - name: status
      description: HTTP status code for the response.
      type: HttpStatus

    - name: headers
      description: Response headers.
      type: HeadersInit
      optional: true

    - name: contentType
      description: Explicit content type. When omitted, blob sources use their existing `type` when available.
      type: string
      optional: true

returns: A file or blob `Response` subclass.
---

# FileHttpResponse

Creates a response from a file path or `Blob`. String paths are resolved with `Bun.file()`. When `contentType` is supplied, it is passed to `Bun.file()` for string sources and written to the `Content-Type` header; otherwise the blob type is used when available.

## Importing

```ts
import { FileHttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { FileHttpResponse, HttpStatus } from '@almighty-shogun/bun-server';

const response = new FileHttpResponse('./public/logo.svg', HttpStatus.Ok, undefined, 'image/svg+xml');
```

<FrontmatterDocs/>

## Type signature

```ts
declare class FileHttpResponse extends HttpBaseResponse {
    constructor(
        source: string | Blob,
        status: HttpStatus,
        headers?: HeadersInit,
        contentType?: string
    );
}
```

