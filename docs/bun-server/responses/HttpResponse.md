---
outline: deep

params:
    - name: body
      description: File path resolved through `Bun.file()`, or an existing `Blob`.
      type: NullableOrUndefinable<string | Blob>
      optional: true
      defaultValue: 'null'

    - name: options
      description: Response status, headers, and content type.
      type: NullableOrUndefinable<BaseOptions>
      optional: true
      defaultValue: 'null'

returns: An `HttpResponse` wrapper that can be returned by route handlers and unwrapped into a native `Response`.
---

# HttpResponse

Response wrapper returned by route handlers, adding one Bun-specific factory to the shared response class.

The addition is `file()`, which serves a path through `Bun.file()`.

::: tip
Every factory on [`HttpBaseResponse`](../../http-core/helpers/response), including `json()`, `html()`, `text()`, `image()`, `custom()`, `redirect()`, and the named status helpers, is available here unchanged. That page is the reference for them; only the addition is documented below.
:::

## Importing

```ts
import { HttpResponse } from '@almighty-shogun/bun-server';
```

## Usage

```ts
import { HttpResponse, HttpStatus } from '@almighty-shogun/bun-server';

const report = HttpResponse.file('./storage/report.pdf');
const download = HttpResponse.file('./storage/export.csv', {
    contentType: 'text/csv; charset=utf-8'
});
const partial = HttpResponse.file('./storage/report.pdf', {
    status: HttpStatus.PartialContent
});

const native = report.unwrap();
```

A string body is a path, and an existing `Blob` is used as-is. When no `contentType` is given, the content type comes from the file itself, which is how `Bun.file()` infers `text/csv` from a `.csv` extension.

```ts
import { defineRoute } from '@almighty-shogun/bun-server';

const route = defineRoute('/report', 'GET', (_, response) => {
    return response.file(Bun.file('./storage/report.pdf'));
});
```

<FrontmatterDocs/>

## Uses

- [CoreOptions](../../http-core/types#coreoptions)
- [HttpBaseResponse](../../http-core/helpers/response)
- [NullableOrUndefinable](../../utils/types#nullableorundefinable)
- [Undefinable](../../utils/types#undefinable)

## Type signature

```ts
import {
    HttpBaseResponse,
    type CoreOptions
} from '@almighty-shogun/http-core';

declare class HttpResponse extends HttpBaseResponse {
    static file(
        body?: NullableOrUndefinable<string | Blob>,
        options?: NullableOrUndefinable<BaseOptions>
    ): HttpBaseResponse;
}

type BaseOptions = CoreOptions & {
    contentType?: Undefinable<string>;
};
```
