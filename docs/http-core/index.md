# HTTP Core

Runtime-agnostic HTTP vocabulary and response helpers shared by Fetch API servers. The package holds the method and status constants, the image and redirect unions, and the [`HttpBaseResponse`](./helpers/response) class that [`@almighty-shogun/bun-server`](../bun-server/) and [`@almighty-shogun/cloudflare-worker`](../cloudflare-worker/) both build on, so the same response shape means the same thing in either runtime.

Most applications never install this package directly. Installing a server package pulls it in, and both re-export its vocabulary from their own root, so a route file imports everything it needs from one place.

## Categories

- [Response](./helpers/response) &mdash; `HttpBaseResponse` factory methods create responses for JSON, HTML, text, images, redirects, and common status responses such as not found and too many requests.
- [Requests](./helpers/requests) &mdash; `queryString`, `queryInteger`, `queryNumber`, `queryBoolean`, `queryDate`, `queryList`, and `queryNumericList` read a typed value out of a request's query string, falling back when it is missing or unparseable and throwing when no fallback is given.
- [Errors](./errors) &mdash; one class per failure, each extending `Error` and carrying the values that caused it, so a caller catches exactly the case it wants to handle.
- [Types](./types) &mdash; HTTP method and status constants, the image and redirect content unions, and the four option shapes the factory methods accept.

## Dependencies

- A Fetch API host &mdash; required for `Response`, `Headers`, and the `BodyInit` and `HeadersInit` types. Bun, Cloudflare Workers, Deno, and Node 18+ all qualify.
- [`@almighty-shogun/utils`](../utils/) &mdash; a direct dependency, used for shared utility types only and never at runtime.
- [`luxon`](https://moment.github.io/luxon/) &mdash; a direct dependency used only by [`queryDate`](./helpers/requests#querydate). Bundles that never call it drop Luxon entirely.

The package has no runtime-specific code. It never touches a filesystem, a process, or a Bun or Workers global, which is what lets both server packages share one class.

## Quick example

```ts
import { HttpBaseResponse } from '@almighty-shogun/http-core';

const response = HttpBaseResponse.json({ ok: true });
const native = response.unwrap();
```

Continue with [installation](./installation) or jump to a category from the sidebar.
