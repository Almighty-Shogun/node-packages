# Installation

`@almighty-shogun/cloudflare-worker` ships as ESM and exposes named exports from the package root. It is designed for Cloudflare Worker entry files that export a module worker and are deployed with Wrangler.

## Install

::: code-group

```sh [Bun]
bun add @almighty-shogun/cloudflare-worker
```

```sh [NPM]
npm install @almighty-shogun/cloudflare-worker
```

```sh [PNPM]
pnpm add @almighty-shogun/cloudflare-worker
```

```sh [Yarn]
yarn add @almighty-shogun/cloudflare-worker
```

:::

## Importing

All public APIs are available from the package root.

```ts
import { createWorker } from '@almighty-shogun/cloudflare-worker';
```

## Re-exported from HTTP Core

Every export of `http-core` is available from this package, so a route file needs one import even when it mixes a route definition, a query helper, and an error class. That covers the [query helpers](../http-core/helpers/requests#queryinteger), the [error classes](../http-core/helpers/errors#missingparametererror), [`HttpStatus`](../http-core/types#httpstatus), [`HttpMethod`](../http-core/types#httpmethod), and the rest of the shared vocabulary. They are documented on the `http-core` pages, and importing them from there works too if you prefer.

## Requirements

- Wrangler 4+ to develop and deploy the Worker.
- A Worker entry file whose default export is the value returned by [`createWorker`](./worker/createWorker).
- `@cloudflare/workers-types` for TypeScript. The published types reference `ExecutionContext` and `ScheduledController`, so it is declared as an optional peer dependency. Worker projects normally have it already.
- Exactly one resolved copy of [`@almighty-shogun/http-core`](../http-core/). It arrives as a direct dependency, and the worker checks handler results against its response class, so two copies at different versions would make a valid response fail that check.

## Worker entry file

The default export must be the worker module, because Cloudflare calls `fetch` and `scheduled` on it.

```ts
import {
    createWorker,
    defineRoute
} from '@almighty-shogun/cloudflare-worker';

const routes = {
    config: defineRoute('/config', 'GET', async (_, response, env) => {
        return response.json(await env.CACHE.get('config', 'json'));
    })
};

export default createWorker({ routes });
```

Bindings arrive as the handler's third argument, typed from [`WorkerEnv`](./types#workerenv). Routes that need none take two parameters and never see the environment.

## Declaring your bindings

`WorkerEnv` ships empty, so `env.CACHE` above does not compile until your bindings are declared. Augment it from any file the compiler includes, in a file that is a module rather than a script. See [`WorkerEnv`](./types#workerenv) for the rule and what happens when it is broken.

```ts
import type { Undefinable } from '@almighty-shogun/utils';

declare module '@almighty-shogun/cloudflare-worker' {
    interface WorkerEnv {
        CACHE: KVNamespace;
        ASSETS: Fetcher;
        SENTRY_DSN: Undefinable<string>;
    }
}
```

`SENTRY_DSN` is a secret rather than a configured binding. Declare it here like any other, but set its value with Wrangler so it never enters the repository or the configuration file:

```sh
bunx wrangler secret put SENTRY_DSN
```

## Wrangler configuration

Wrangler reads either a `.toml` or a `.jsonc` configuration; the example below uses `.toml`. It is a minimal setup that serves static assets, exposes a KV binding, routes a custom domain, and declares the cron expressions your scheduled tasks run on:

```toml
name = "my-worker"
main = "src/index.ts"
compatibility_date = "2026-08-01"

[[routes]]
pattern = "domain.com"
custom_domain = true

[assets]
directory = "./public"
binding = "ASSETS"

[[kv_namespaces]]
binding = "CACHE"
id = "<namespace-id>"

[triggers]
crons = ["*/30 * * * *", "0 3 * * *"]
```

Every expression under `triggers.crons` must match one passed to [`defineScheduled()`](./scheduling/defineScheduled), otherwise the trigger fires and nothing runs.

## Deploying from GitHub Actions

Store your Cloudflare account ID as the `CLOUDFLARE_ACCOUNT_ID` repository secret and an API token as `CLOUDFLARE_ACCOUNT_TOKEN`, then deploy with the official action:

```yaml
name: 🚀 Release, build and deploy

on:
    release:
        types: [ released ]

jobs:
    publish:
        runs-on: ubuntu-latest
        name: 🚀 Build and deploy

        steps:
            - name: 👀 Checkout
              uses: actions/checkout@v6

            - name: ⚙️ Setup Bun
              uses: oven-sh/setup-bun@v2

            - name: 📦️ Install dependencies
              run: bun install --frozen-lockfile

            - name: 🔨 Build application
              run: bun run build

            - name: 🚀 Deploy
              uses: cloudflare/wrangler-action@v3
              with:
                  accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
                  apiToken: ${{ secrets.CLOUDFLARE_ACCOUNT_TOKEN }}
                  gitHubToken: ${{ secrets.GITHUB_TOKEN }}
                  wranglerVersion: "4.69.0"
```

The build step assumes a project that produces static assets. A Worker with no `build` script can drop it, because `wrangler deploy` bundles the entry point itself.
