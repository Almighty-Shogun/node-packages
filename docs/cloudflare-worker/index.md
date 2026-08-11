# Cloudflare Worker

Typed routing, worker setup, and response helpers for Cloudflare Workers. The package is intended for Worker projects that want typed route definitions with path parameters, predictable response helpers, and a ready-made module export without adopting a larger framework.

## Categories

- [Routing](./routing/defineRoute) &mdash; [`defineRoute`](./routing/defineRoute) creates typed method route definitions, and [`compileRoutes`](./routing/compileRoutes) turns a route collection into a sorted, matchable route list.
- [Scheduling](./scheduling/defineScheduled) &mdash; [`defineScheduled`](./scheduling/defineScheduled) declares a task for a cron expression, and [`compileScheduled`](./scheduling/compileScheduled) merges every task registered for the same expression.
- [Worker](./worker/createWorker) &mdash; [`createWorker`](./worker/createWorker) builds the `fetch` and `scheduled` module export, dispatching requests, falling back to static assets, running scheduled tasks, and handling errors.
- [Response](./responses/HttpResponse) &mdash; [`HttpResponse`](./responses/HttpResponse) adds a `from()` factory for forwarding an upstream response to the shared [`@almighty-shogun/http-core`](../http-core/helpers/response) class, whose methods create responses for JSON, HTML, text, images, redirects, and common status responses such as not found and too many requests.
- [Types](./types) &mdash; the augmentable [`WorkerEnv`](./types#workerenv) interface, route and request type helpers, and worker option types.

## Dependencies

- Cloudflare Workers runtime &mdash; required for `ExecutionContext`, `ScheduledController`, and the Fetch API primitives the package builds on.
- [`@almighty-shogun/http-core`](../http-core/) &mdash; a direct dependency providing the HTTP vocabulary, the query helpers, the error classes, and the response class.
- [`@almighty-shogun/utils`](../utils/) &mdash; a direct dependency, used for shared utility types only and never at runtime.

This package targets the Workers runtime. It does not use Node APIs, a filesystem, or a persistent process, so it does not run under Node.js or Bun without a Workers-compatible host.

## Quick example

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

export default createWorker({ routes });
```

Continue with [installation](./installation) or jump to a category from the sidebar.
