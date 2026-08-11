---
outline: deep

params:
    - name: options
      description: Worker configuration holding the route collection and optional behaviour.
      type: CreateWorkerOptions

returns: A worker module with `fetch` and `scheduled` methods, ready to be used as the Worker default export.
---

# createWorker

Creates the module object Cloudflare expects from a Worker entry file, wiring a route collection and an optional scheduled collection into the `fetch()` and `scheduled()` methods the runtime calls.

Both collections are compiled once when the module is created, so a duplicate route or a conflicting parameter name throws while the Worker is starting rather than on the first request that reaches it.

## Importing

```ts
import { createWorker } from '@almighty-shogun/cloudflare-worker';
```

## Usage

The returned module must be the entry file's default export, because Cloudflare calls `fetch()` and `scheduled()` on it.

```ts
import {
    createWorker,
    defineRoute
} from '@almighty-shogun/cloudflare-worker';

const routes = {
    health: defineRoute('/health', 'GET', (_, response) => {
        return response.json({ ok: true });
    })
};

export default createWorker({
    routes,
    defaultErrorResponse: 'json'
});
```

Name the binding that serves static assets to answer requests no route matched, instead of returning `404`.

```ts
import * as routes from './routes';
import { createWorker } from '@almighty-shogun/cloudflare-worker';

export default createWorker({
    routes,
    assets: 'ASSETS'
});
```

`assets` is constrained to the [`WorkerEnv`](../types#workerenv) keys whose binding exposes `fetch()`, so it only compiles once the binding is declared through module augmentation.

Pass a scheduled collection to run background work on Cron Triggers.

```ts
import * as routes from './routes';
import * as scheduled from './scheduled';
import { createWorker } from '@almighty-shogun/cloudflare-worker';

export default createWorker({ routes, scheduled });
```

Use `onError` to record a failure without changing the response the client receives.

```ts
import * as routes from './routes';
import { createWorker } from '@almighty-shogun/cloudflare-worker';

export default createWorker({
    routes,
    defaultErrorResponse: 'json',
    onError: (error, request) => {
        console.error(request.url, error);

        return null;
    }
});
```

## Options

`routes` is the only required option and accepts any [`RouteCollection`](../types#routecollection).

`scheduled` accepts a [`ScheduledCollection`](../types#scheduledcollection) of tasks created with [`defineScheduled()`](../scheduling/defineScheduled). When it is omitted the module still exposes `scheduled()`, and calling it resolves without doing anything.

`assets` names the binding used when no route matches. It is constrained to the keys of `Env` whose binding exposes a `fetch()` method, so pointing it at a KV namespace is a compile error rather than a runtime one.

`defaultErrorResponse` selects the body format for the responses the worker generates itself, meaning `404`, `405`, and `500`. `'json'` produces `{ "status": 500, "error": "Internal Server Error" }`, `'text'` produces the message as plain text, and `null` produces an empty body.

`automaticHead` and `automaticOptions` both default to `true`. The first answers a `HEAD` request using the route's `GET` handler and strips the body, and the second answers `OPTIONS` with `204` and an `Allow` header. Set either to `false` to handle those methods yourself.

## Request dispatch

A request is resolved in a fixed order. The worker matches the pathname against the compiled routes; on a miss it delegates to the binding named by `assets` when one is configured, and otherwise answers `404`. On a match it looks for a handler registered for the request method, then falls back to an automatic `HEAD` or `OPTIONS` response, and otherwise answers `405` with an `Allow` header listing the methods that path accepts.

A Cron Trigger runs every task registered for the expression that fired, in the order [`compileScheduled()`](../scheduling/compileScheduled) collected them. A trigger with no matching task does nothing.

## Failure handling

Route errors never reach the client verbatim. Anything thrown inside a handler is caught, passed to `onError` when one is supplied, and otherwise answered with a generic `500` whose body follows `defaultErrorResponse`. The thrown message is never included, so an internal failure cannot leak a token, a query, or a stack trace through a public route. Returning `null` from `onError` falls through to that same generated response.

Scheduled tasks fail independently. A task that throws does not cancel the tasks after it: the rest still run, and the failure is rethrown once they finish, or wrapped in an `AggregateError` when more than one failed.

<FrontmatterDocs/>

## Type signature

```ts
declare function createWorker(options: CreateWorkerOptions): WorkerModule;
```
