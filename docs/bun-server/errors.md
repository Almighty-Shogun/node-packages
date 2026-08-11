# Errors

Failures specific to Bun HTML routes, thrown while compiling a route collection. Each is its own class extending `Error` directly, matching the [`@almighty-shogun/http-core`](../http-core/errors) errors that this package also re-exports.

Every error carries the values that describe the failure as readonly fields, so a handler never parses a message, and each sets `name` to its own class name, which survives minification.

## EmptyHtmlRoutePathsError

Thrown by [`defineHtmlRoute()`](./routing/defineHtmlRoute) results during compilation when the path array is empty. An HTML route with no path registers nothing, so an empty array is treated as a mistake rather than as a route that serves nowhere.

```ts
import { EmptyHtmlRoutePathsError } from '@almighty-shogun/bun-server';

throw new EmptyHtmlRoutePathsError();
```

### Type signature

```ts
declare class EmptyHtmlRoutePathsError extends Error {
    constructor();
}
```

## DuplicateHtmlRouteError

Thrown while compiling routes when the same path is registered as an HTML route twice, so one bundle would silently shadow the other. It carries the path that collided.

```ts
import { DuplicateHtmlRouteError } from '@almighty-shogun/bun-server';

throw new DuplicateHtmlRouteError('/dashboard');
```

### Type signature

```ts
declare class DuplicateHtmlRouteError extends Error {
    readonly path: string;

    constructor(path: string);
}
```

## ConflictingRouteTypeError

Thrown while compiling routes when one path is registered as both an HTML route and a method route. The two cannot coexist, because Bun serves a path either from a bundle or from a handler, so the collision is rejected rather than resolved by declaration order. It carries the path.

```ts
import { ConflictingRouteTypeError } from '@almighty-shogun/bun-server';

throw new ConflictingRouteTypeError('/dashboard');
```

### Type signature

```ts
declare class ConflictingRouteTypeError extends Error {
    readonly path: string;

    constructor(path: string);
}
```
