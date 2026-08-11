# Errors

Every error this package throws is its own class extending `Error` directly, so a caller catches exactly the failure it wants to handle. There is no shared base class: catching all of them means listing the ones you care about, or falling back to `instanceof Error`.

Each constructor takes the values that describe the failure and builds the message from them, and keeps those values as readonly fields so a handler never parses a string. Each also sets `name` to its own class name, which survives minification.

## MissingParameterError

Thrown by the [request helpers](./helpers/requests) when a required parameter is absent, meaning no fallback was passed and the query string has no such key. It carries the parameter name, so a handler can answer `400 Bad Request` naming the field without parsing the message.

```ts
import { MissingParameterError } from '@almighty-shogun/http-core';

throw new MissingParameterError('page');
```

### Type signature

```ts
declare class MissingParameterError extends Error {
    readonly parameter: string;

    constructor(parameter: string);
}
```

## InvalidParameterError

Thrown by the [request helpers](./helpers/requests) when a required parameter is present but cannot be parsed as the requested type. It carries the parameter name and a description of what was expected, so a handler can explain the rejection precisely.

```ts
import { InvalidParameterError } from '@almighty-shogun/http-core';

throw new InvalidParameterError('page', 'a whole number');
```

### Type signature

```ts
declare class InvalidParameterError extends Error {
    readonly parameter: string;
    readonly expected: string;

    constructor(parameter: string, expected: string);
}
```

## InvalidRouteCollectionError

Thrown while compiling routes when the collection is not a plain object, which usually means a route module was passed where the routes barrel was meant. Like the other compilation errors it is raised at startup, so a server or worker fails to boot rather than serving broken routes.

```ts
import { InvalidRouteCollectionError } from '@almighty-shogun/http-core';

throw new InvalidRouteCollectionError();
```

### Type signature

```ts
declare class InvalidRouteCollectionError extends Error {
    constructor();
}
```

## EmptyRouteCollectionError

Thrown while compiling routes when the collection is a valid object but exports nothing, which usually means the routes barrel is empty or its re-exports were removed. Compiling nothing is treated as a mistake rather than as a server with no routes.

```ts
import { EmptyRouteCollectionError } from '@almighty-shogun/http-core';

throw new EmptyRouteCollectionError();
```

### Type signature

```ts
declare class EmptyRouteCollectionError extends Error {
    constructor();
}
```

## EmptyRouteExportError

Thrown while compiling routes when one export of the collection is an empty array. A route file may export an array to register several methods for a path, and an empty one registers nothing, so the error carries the offending export name.

```ts
import { EmptyRouteExportError } from '@almighty-shogun/http-core';

throw new EmptyRouteExportError('posts');
```

### Type signature

```ts
declare class EmptyRouteExportError extends Error {
    readonly exportName: string;

    constructor(exportName: string);
}
```

## DuplicateRouteError

Thrown while compiling routes when the same HTTP method is registered twice for the same path, so one handler would silently shadow the other. It carries the method and path that collided.

```ts
import { DuplicateRouteError } from '@almighty-shogun/http-core';

throw new DuplicateRouteError('GET', '/health');
```

### Type signature

```ts
declare class DuplicateRouteError extends Error {
    readonly method: string;
    readonly path: string;

    constructor(method: string, path: string);
}
```

## ConflictingRoutePathsError

Thrown while compiling routes when two paths have the same shape but different parameter names, such as `/users/:id` and `/users/:userId`. Both would match the same requests, so which parameter name a handler receives would depend on registration order, and the error carries both paths.

```ts
import { ConflictingRoutePathsError } from '@almighty-shogun/http-core';

throw new ConflictingRoutePathsError('/users/:id', '/users/:userId');
```

### Type signature

```ts
declare class ConflictingRoutePathsError extends Error {
    readonly existing: string;
    readonly incoming: string;

    constructor(existing: string, incoming: string);
}
```

## InvalidJsonBodyError

Thrown by [`HttpBaseResponse.json()`](./helpers/response) when the body cannot be serialized, which usually means it contains a circular reference or a value `JSON.stringify()` refuses. The `TypeError` that `JSON.stringify()` threw is kept as the error's `cause`, so the underlying reason is not lost.

```ts
import { InvalidJsonBodyError } from '@almighty-shogun/http-core';

throw new InvalidJsonBodyError(error);
```

### Type signature

```ts
declare class InvalidJsonBodyError extends Error {
    constructor(cause: unknown);
}
```

## InvalidHandlerResultError

Thrown at dispatch time when a route handler resolves to something other than an `HttpResponse`, which usually means it returned a native `Response` or dropped its `return`. It carries the method and pathname of the route that misbehaved.

Both mistakes are compile errors in TypeScript, because a handler is typed to return an `HttpResponse`, so this one mostly fires in JavaScript or behind a cast.

```ts
import { InvalidHandlerResultError } from '@almighty-shogun/http-core';

throw new InvalidHandlerResultError('GET', '/health');
```

### Type signature

```ts
declare class InvalidHandlerResultError extends Error {
    readonly method: string;
    readonly pathname: string;

    constructor(method: string, pathname: string);
}
```
