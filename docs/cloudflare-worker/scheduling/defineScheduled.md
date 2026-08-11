---
outline: deep

params:
    - name: cron
      description: Cron expression the task runs on, matching one declared in the Wrangler configuration.
      type: Cron

    - name: handler
      description: Handler that receives the scheduled run and the environment.
      type: ScheduledHandler

returns: An immutable scheduled definition that can be included in a scheduled collection.
---

# defineScheduled

Creates a typed scheduled task for a single cron expression. Use it to describe background work before passing a collection to [`createWorker()`](../worker/createWorker) or [`compileScheduled()`](./compileScheduled).

The returned object is frozen, so scheduled definitions are treated as static configuration after creation.

## Importing

```ts
import { defineScheduled } from '@almighty-shogun/cloudflare-worker';
```

## Usage

```ts
import { defineScheduled } from '@almighty-shogun/cloudflare-worker';

const task = defineScheduled('0 3 * * *', (run) => {
    console.log(`Ran on ${run.cron}`);
});
```

::: tip
The cron expressions used here must also be declared under `triggers.crons` in your [Wrangler configuration](../installation#wrangler-configuration). The package cannot read that file, so an expression that is defined here but never triggered is silently inert.
:::

## Scheduled run

The first argument carries `controller` for `noRetry()` and `scheduledTime`, `ctx` for `waitUntil()`, and `cron` as a convenience for the expression that triggered the run.

Bindings and secrets arrive as a second argument, typed as [`WorkerEnv`](../types#workerenv), so a task that needs none never sees the environment.

```ts
import { defineScheduled } from '@almighty-shogun/cloudflare-worker';

const task = defineScheduled('0 3 * * *', async (run, env) => {
    await env.CACHE.put('last-run', run.cron);
});
```

## Merging tasks

Cloudflare accepts several cron expressions per Worker but calls a single `scheduled()` entry point for all of them, passing the expression that fired as `controller.cron`. Defining tasks individually removes that dispatch: unrelated work lives in separate modules, several tasks can name the same expression, and the worker runs every one registered for whichever expression fired.

```ts
import { defineScheduled } from '@almighty-shogun/cloudflare-worker';

export const prune = defineScheduled('0 3 * * *', () => {
    console.log('Pruning');
});

export const report = defineScheduled('0 3 * * *', () => {
    console.log('Reporting');
});
```

<FrontmatterDocs/>

## Type signature

```ts
declare function defineScheduled<const Cron extends string>(
    cron: Cron,
    handler: ScheduledHandler
): ScheduledDefinition<Cron>;
```
