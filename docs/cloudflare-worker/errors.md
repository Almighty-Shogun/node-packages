# Errors

Failures specific to scheduled tasks, thrown while compiling a scheduled collection or while running the tasks a trigger fired. Each is its own class, matching the [`@almighty-shogun/http-core`](../http-core/errors) errors that this package also re-exports.

The three collection errors mirror the route collection errors from `http-core`, because a scheduled collection has the same three failure modes as a route collection.

## InvalidScheduledCollectionError

Thrown by [`compileScheduled()`](./scheduling/compileScheduled) when the collection is not a plain object, which usually means a task module was passed where the tasks barrel was meant.

```ts
import {
    InvalidScheduledCollectionError
} from '@almighty-shogun/cloudflare-worker';

throw new InvalidScheduledCollectionError();
```

### Type signature

```ts
declare class InvalidScheduledCollectionError extends Error {
    constructor();
}
```

## EmptyScheduledCollectionError

Thrown when the collection is a valid object but exports nothing, which usually means the tasks barrel is empty or its re-exports were removed. Compiling nothing is treated as a mistake rather than as a worker with no scheduled work.

```ts
import {
    EmptyScheduledCollectionError
} from '@almighty-shogun/cloudflare-worker';

throw new EmptyScheduledCollectionError();
```

### Type signature

```ts
declare class EmptyScheduledCollectionError extends Error {
    constructor();
}
```

## EmptyScheduledExportError

Thrown when one export of the collection is an empty array. A task file may export an array to register several tasks, and an empty one registers nothing, so the error carries the offending export name.

```ts
import {
    EmptyScheduledExportError
} from '@almighty-shogun/cloudflare-worker';

throw new EmptyScheduledExportError('cleanup');
```

### Type signature

```ts
declare class EmptyScheduledExportError extends Error {
    readonly exportName: string;

    constructor(exportName: string);
}
```

## EmptyCronExpressionError

Thrown when a task is declared with a cron expression that is empty or only whitespace. Such an expression can never match a trigger, so the task would silently never run.

```ts
import {
    EmptyCronExpressionError
} from '@almighty-shogun/cloudflare-worker';

throw new EmptyCronExpressionError();
```

### Type signature

```ts
declare class EmptyCronExpressionError extends Error {
    constructor();
}
```

## ScheduledTasksFailedError

Thrown by the worker's `scheduled` handler when more than one task registered for the same cron expression throws. Every task runs even when an earlier one fails, so the failures are collected and reported together.

It extends `AggregateError`, so the individual failures stay available on `errors`, and it adds the cron expression that fired. A single failing task is rethrown as-is rather than wrapped.

```ts
import {
    ScheduledTasksFailedError
} from '@almighty-shogun/cloudflare-worker';

throw new ScheduledTasksFailedError('0 3 * * *', [
    new Error('purge failed')
]);
```

### Type signature

```ts
declare class ScheduledTasksFailedError extends AggregateError {
    readonly cron: string;

    constructor(cron: string, errors: readonly unknown[]);
}
```
