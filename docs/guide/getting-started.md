# Getting started

This guide shows how to install one or more `@almighty-shogun/*` packages and use them in a TypeScript or Vue project.

## Prerequisites

- Bun, npm, pnpm, or yarn.
- TypeScript for typed imports and declarations.
- Vue 3.5+ and Vue Router 5.x when using [`@almighty-shogun/common`](/common/). Both are required peer dependencies.
- A browser runtime for DOM helpers and WebKit bridge runtime APIs.
- The Bun runtime for [`@almighty-shogun/bun-server`](/bun-server/), and the Cloudflare Workers runtime for [`@almighty-shogun/cloudflare-worker`](/cloudflare-worker/).

## Install your first package

Most projects can start with [`@almighty-shogun/utils`](/utils/). It provides named exports for formatting, dates, locale data, and small browser helpers.

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
import { DateTime } from 'luxon';
import { formatDate, formatCurrency } from '@almighty-shogun/utils';

const date = formatDate(DateTime.now(), 'en');
const total = formatCurrency(1299.5, 'EUR', 'en');
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

```sh [PNPM]
pnpm add @almighty-shogun/utils @almighty-shogun/common luxon vue vue-router
```

```sh [Yarn]
yarn add @almighty-shogun/utils @almighty-shogun/common luxon vue vue-router
```

:::

`utils` arrives automatically as a dependency of `common`, but declare it yourself when your own code imports from it, as below. The same applies to `luxon` once you build `DateTime` values to pass into the date helpers.

```ts
import { DateTime } from 'luxon';
import { formatDate } from '@almighty-shogun/utils';
import { useLoaded, useOpen } from '@almighty-shogun/common';

const { isOpen, open, close } = useOpen();
const { isLoading, load } = useLoaded();

const today = formatDate(DateTime.now(), 'en');
```

## Prototype extensions

[`@almighty-shogun/prototype-extensions`](/prototype-extensions/) is different from the other packages: it is imported for side effects and should be loaded once in your application entry file.

```ts
// main.ts
import '@almighty-shogun/prototype-extensions';
```

After that import, prototype methods are available anywhere in the application runtime:

```ts
const selected = ['users', 'settings'].addOrRemove('users');
const slug = 'User Settings'.toSlug();
```

## WebKit native bridge

Use [`@almighty-shogun/webkit-native-bridge`](/webkit-native-bridge/) when JavaScript runs inside a native WebKit host and needs to call into that host through `window.webkit.messageHandlers`.

```ts
import { createNativeBridge } from '@almighty-shogun/webkit-native-bridge';

type Requests = {
    ping: { body: void; response: 'pong' };
};

const bridge = createNativeBridge<Requests>();
const response = await bridge.request('ping');
```

## Bun server

Use `bun-server` when a Bun HTTP server needs typed route definitions and consistent response helpers without a larger framework.

```ts
import { createServer, defineRoute } from '@almighty-shogun/bun-server';

const routes = {
    health: defineRoute('/health', 'GET', (_, response) => {
        return response.json({ ok: true });
    })
};

createServer({
    port: 3000,
    routes
});
```

## Cloudflare Worker

Use `cloudflare-worker` for the same style of typed routing on the Workers runtime. [`createWorker`](/cloudflare-worker/worker/createWorker) returns the `fetch` and `scheduled` module export Cloudflare expects, so it becomes the default export of your entry file.

```ts
import {
    createWorker,
    defineRoute,
    defineScheduled
} from '@almighty-shogun/cloudflare-worker';

const routes = {
    user: defineRoute('/users/:id', 'GET', (request, response) => {
        return response.json({ id: request.params.id });
    })
};

const scheduled = {
    cleanup: defineScheduled('0 3 * * *', (run) => {
        console.log(`Running ${run.cron}`);
    })
};

export default createWorker({ routes, scheduled });
```

The path is a literal type, so `request.params` is typed from it: `/users/:id` gives `params.id` and nothing else.

## Shared HTTP helpers

`bun-server` and `cloudflare-worker` both build on [`@almighty-shogun/http-core`](/http-core/), and both re-export **every** one of its exports from their own root. The status vocabulary, the [query helpers](/http-core/helpers/requests), and the [error classes](/http-core/errors) come from the package you already installed:

```ts
import {
    defineRoute,
    queryInteger
} from '@almighty-shogun/cloudflare-worker';

const routes = {
    users: defineRoute('/users', 'GET', (request, response) => {
        const page = queryInteger(request, 'page', 1);

        return response.json({ page });
    })
};
```

Install [`http-core`](/http-core/installation) directly only when you are writing your own server wrapper and want the vocabulary without a runtime attached.
