# Installation

`@almighty-shogun/bun-server` ships as ESM and exposes named exports from the package root. It is designed for Bun runtime code that uses `Bun.serve()`, typed route definitions, and response helpers.

## Install

::: code-group

```sh [Bun]
bun add @almighty-shogun/bun-server
```

```sh [NPM]
npm install @almighty-shogun/bun-server
```

```sh [PNPM]
pnpm add @almighty-shogun/bun-server
```

```sh [Yarn]
yarn add @almighty-shogun/bun-server
```

:::

## Importing

All public APIs are available from the package root.

```ts
import { createServer, defineRoute } from '@almighty-shogun/bun-server';
```

## Re-exported from HTTP Core

Every export of `http-core` is available from this package, so a route file needs one import even when it mixes a route definition, a query helper, and an error class. That covers the [query helpers](../http-core/helpers/requests#queryinteger), the [error classes](../http-core/helpers/errors#missingparametererror), [`HttpStatus`](../http-core/types#httpstatus), [`HttpMethod`](../http-core/types#httpmethod), and the rest of the shared vocabulary. They are documented on the `http-core` pages, and importing them from there works too if you prefer.

## Requirements

- Bun 1.3+ for `Bun.serve()`, `BunRequest`, `Server`, `Bun.file()`, and HTML imports.
- A Bun runtime entry file for server code.
- `@types/bun` for TypeScript. The published types reference Bun's global types, so it is declared as an optional peer dependency. Bun projects normally have it already.
- Exactly one resolved copy of [`@almighty-shogun/http-core`](../http-core/). It arrives as a direct dependency, and the server checks handler results against its response class, so two copies at different versions would make a valid response fail that check.
