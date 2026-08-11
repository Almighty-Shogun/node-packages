# Installation

`@almighty-shogun/http-core` ships as ESM and exposes named exports from the package root. It is designed to be shared by server packages rather than installed on its own, so most projects get it as a transitive dependency of [`@almighty-shogun/bun-server`](../bun-server/) or [`@almighty-shogun/cloudflare-worker`](../cloudflare-worker/) and import from those instead.

## Install

::: code-group

```sh [Bun]
bun add @almighty-shogun/http-core
```

```sh [NPM]
npm install @almighty-shogun/http-core
```

```sh [PNPM]
pnpm add @almighty-shogun/http-core
```

```sh [Yarn]
yarn add @almighty-shogun/http-core
```

:::

## Importing

All public APIs are available from the package root.

```ts
import { HttpBaseResponse, HttpStatus } from '@almighty-shogun/http-core';
```

Both server packages re-export the same members, so a route file needs only one import and never names this package.

```ts
import { defineRoute, HttpStatus } from '@almighty-shogun/bun-server';
```

## Requirements

- A host that provides the Fetch API globals `Response` and `Headers`. Bun, Cloudflare Workers, Deno, and Node 18+ all qualify.
- No runtime type package. Unlike the server packages, nothing here references a Bun or Workers global, so there is no optional peer dependency to install.

## Extending the response class

The constructor is `protected`, so a package that needs a runtime-specific factory subclasses instead of reaching for `new`. This is how `bun-server` adds its `file()` method.

```ts
import { HttpBaseResponse, HttpStatus } from '@almighty-shogun/http-core';

export default class extends HttpBaseResponse {
    public static pdf(body: Blob): HttpBaseResponse {
        return this.custom(body, HttpStatus.Ok, {
            contentType: 'application/pdf'
        });
    }
}
```

::: warning
A subclass adds factory methods, it does not replace the class identity. Server packages check the handler result with `instanceof` against the `http-core` class, so an application must resolve exactly one copy of the package. Two copies at different versions make a valid response fail that check.
:::
