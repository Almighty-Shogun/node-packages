---
outline: deep

params:
    - name: collection
      description: Scheduled collection whose exports hold scheduled definitions.
      type: ScheduledCollection

returns: A sorted list of cron expressions, each carrying every handler registered for it.
---

# compileScheduled

Merges a scheduled collection into one entry per cron expression. [`createWorker()`](../worker/createWorker) calls it for you, so reach for it directly only when you want to inspect what will run for a given expression.

## Importing

```ts
import { compileScheduled } from '@almighty-shogun/cloudflare-worker';
```

## Usage

For small workers, pass an object directly. Each property name is only used as the collection key; the cron expression comes from the task definition itself.

```ts
import {
    compileScheduled,
    defineScheduled
} from '@almighty-shogun/cloudflare-worker';

const compiled = compileScheduled({
    prune: defineScheduled('0 3 * * *', (_) => {
        console.log('Pruning');
    })
});
```

For larger workers, keep each task in `src/scheduled/*.ts`, export them from `src/scheduled/index.ts`, and pass the namespace import to `compileScheduled()`. This keeps the worker entry point small while still making all registered tasks explicit.

::: code-group

```ts [scheduled/prune.ts]
import { defineScheduled } from '@almighty-shogun/cloudflare-worker';

export default defineScheduled('0 3 * * *', (_) => {
    console.log('Pruning');
});
```

```ts [scheduled/refresh.ts]
import { defineScheduled } from '@almighty-shogun/cloudflare-worker';

export default defineScheduled('*/30 * * * *', (_) => {
    console.log('Refreshing');
});
```

```ts [scheduled/index.ts]
export { default as prune } from './prune';
export { default as refresh } from './refresh';
```

```ts [index.ts]
import * as scheduled from './scheduled';
import { compileScheduled } from '@almighty-shogun/cloudflare-worker';

const compiled = compileScheduled(scheduled);
```

:::

::: tip
A task file can also export an array when one module registers work on several expressions. `compileScheduled()` flattens those arrays before grouping.
:::

## Task files

A task file can export a single [`defineScheduled()`](./defineScheduled) result or an array of definitions. Tasks naming the same expression are grouped rather than rejected, which is the point of the API: separate modules can each register work for `0 3 * * *`, and all of it runs when that trigger fires.

Exports are read in alphabetical order by key, so a barrel file of task modules compiles deterministically.

## Merge order

Entries are sorted by cron expression, and the handlers inside an entry keep the order they were collected in.

```ts
import {
    compileScheduled,
    defineScheduled
} from '@almighty-shogun/cloudflare-worker';

const compiled = compileScheduled({
    prune: defineScheduled('0 3 * * *', (_) => {}),
    refresh: defineScheduled('*/30 * * * *', (_) => {}),
    warm: defineScheduled('*/30 * * * *', (_) => {})
});

compiled.map((entry) => [entry.cron, entry.handlers.length]);

// [['*/30 * * * *', 2], ['0 3 * * *', 1]]
```

## Validation

Compilation is strict and throws rather than silently dropping a task. It rejects:

- a collection that is not an object
- a collection that exports nothing
- an export whose array is empty
- a cron expression that is empty or only whitespace

Cron expressions are not otherwise parsed, because the package cannot see the Wrangler configuration that decides which triggers exist. An expression that is never declared under `triggers.crons` compiles without complaint and simply never runs.

<FrontmatterDocs/>

## Type signature

```ts
declare function compileScheduled(
    collection: ScheduledCollection
): CompiledScheduledCollection;
```
