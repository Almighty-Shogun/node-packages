---
outline: deep

params:
    - name: response
      description: Native response to adopt, with its status, headers, and body stream.
      type: Response

returns: An `HttpResponse` wrapper that can be returned by route handlers and unwrapped into a native `Response`.
---

# HttpResponse

Response wrapper returned by route handlers, adding one Workers-oriented factory to the shared response class.

The addition is `from()`, which adopts a native `Response` as-is.

::: tip
Every factory on [`HttpBaseResponse`](../../http-core/helpers/response), including `json()`, `html()`, `text()`, `image()`, `custom()`, `redirect()`, and the named status helpers, is available here unchanged. That page is the reference for them; only the addition is documented below.
:::

## Importing

```ts
import { HttpResponse } from '@almighty-shogun/cloudflare-worker';
```

## Usage

```ts
import { HttpResponse } from '@almighty-shogun/cloudflare-worker';

const upstream = await fetch('https://api.example.com/status');
const forwarded = HttpResponse.from(upstream);

const native = forwarded.unwrap();
```

The upstream status, headers, and body stream are kept unchanged, which is what a handler needs when it proxies a request rather than producing its own body.

```ts
import { defineRoute } from '@almighty-shogun/cloudflare-worker';

const route = defineRoute('/proxy', 'GET', async (_, response) => {
    const upstream = await fetch('https://api.example.com/status');

    return response.from(upstream);
});
```

::: warning
The body of a `Response` can only be consumed once, and `from()` reuses the original stream. Reading the upstream response before wrapping it leaves an empty body for the client.
:::

<FrontmatterDocs/>

## Uses

- [HttpBaseResponse](../../http-core/helpers/response)

## Type signature

```ts
import { HttpBaseResponse } from '@almighty-shogun/http-core';

declare class HttpResponse extends HttpBaseResponse {
    static from(response: Response): HttpBaseResponse;
}
```
