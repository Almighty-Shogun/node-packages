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

## Requirements

- Bun 1.3+ for `Bun.serve()`, `BunRequest`, `Server`, `Bun.file()`, and HTML imports.
- A Bun runtime entry file for server code.
- `@types/bun` for TypeScript. The published types reference Bun's global types, so it is declared as an optional peer dependency. Bun projects normally have it already.
