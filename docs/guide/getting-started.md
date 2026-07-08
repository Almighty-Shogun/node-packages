# Getting started

This guide shows how to install one or more `@almighty-shogun/*` packages and use them in a TypeScript or Vue project.

## Prerequisites

- Bun, npm, pnpm, or yarn.
- TypeScript for typed imports and declarations.
- Vue 3 when using `@almighty-shogun/common`.
- A browser runtime for DOM helpers and WebKit bridge runtime APIs.

## Install your first package

Most projects can start with `@almighty-shogun/utils`. It provides named exports for formatting, dates, locale data, and small browser helpers.

::: code-group

```sh [Bun]
bun add @almighty-shogun/utils luxon
```

```sh [NPM]
npm install @almighty-shogun/utils luxon
```

```sh [PNPM]
pnpm add @almighty-shogun/utils luxon
```

```sh [Yarn]
yarn add @almighty-shogun/utils luxon
```

:::

```ts
import { DateTime } from 'luxon'
import { formatDate, formatCurrency } from '@almighty-shogun/utils'

const date = formatDate(DateTime.now(), 'en')
const total = formatCurrency(1299.5, 'EUR', 'en')
```

## Common Vue setup

A Vue application usually combines `utils` and `common`:

::: code-group

```sh [Bun]
bun add @almighty-shogun/utils @almighty-shogun/common luxon vue vue-router
```

```sh [NPM]
npm install @almighty-shogun/utils @almighty-shogun/common luxon vue vue-router
```

:::

```ts
import { useLoaded, useOpen } from '@almighty-shogun/common'

const { isOpen, open, close } = useOpen()
const { isLoading, load } = useLoaded()
```

## Prototype extensions

`@almighty-shogun/prototype-extensions` is different from the other packages: it is imported for side effects and should be loaded once in your application entry file.

```ts
// main.ts
import '@almighty-shogun/prototype-extensions'
```

After that import, prototype methods are available anywhere in the application runtime:

```ts
const selected = ['users', 'settings'].addOrRemove('users')
const slug = 'User Settings'.toSlug()
```

## WebKit native bridge

Use `@almighty-shogun/webkit-native-bridge` when JavaScript runs inside a native WebKit host and needs to call C++ code through `window.webkit.messageHandlers`.

```ts
import { createNativeBridge } from '@almighty-shogun/webkit-native-bridge'

type Requests = {
    ping: { body: void; response: 'pong' }
}

const bridge = createNativeBridge<Requests>()
const response = await bridge.request('ping')
```

## Bun server

Use `@almighty-shogun/bun-server` when a Bun HTTP server needs typed route definitions and consistent response helpers without a larger framework.

```ts
import { createServer, defineRoute, HttpMethod } from '@almighty-shogun/bun-server';

const routes = {
    health: defineRoute('/health', HttpMethod.Get, (_, response) => {
        return response.json({ ok: true });
    })
};

createServer({
    port: 3000,
    routes
});
```
