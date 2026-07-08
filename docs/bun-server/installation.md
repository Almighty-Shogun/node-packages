---
outline: deep
---

# Installation

Install the package in a Bun project.

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

Use it from Bun runtime code:

```ts
import { createServer, defineRoute, HttpMethod } from '@almighty-shogun/bun-server';

const routes = {
    health: defineRoute('/health', HttpMethod.Get, (_, response) => {
        return response.json({ ok: true });
    })
};

createServer({ port: 3000, routes });
```
