# Request helpers

Typed readers for a request's query string. Each takes the `Request`, the parameter name, and an optional fallback, parses the raw string, and hands back a usable value.

Omitting `fallback` makes the parameter **required**: a missing or unparseable value throws instead of returning a placeholder, a [`MissingParameterError`](./errors#missingparametererror) or an [`InvalidParameterError`](./errors#invalidparametererror) respectively.

## queryString

Reads the value as text. An empty value is a value, so `?q=` returns an empty string rather than falling back; only an absent parameter does that.

```ts
import { queryString } from '@almighty-shogun/http-core';

const request = new Request('https://example.com/posts?q=');

const search = queryString(request, 'q', 'everything');
```

### Type signature

```ts
declare function queryString(
    request: Request,
    name: string,
    fallback?: string
): string;
```

## queryInteger

Reads the value as a whole number. A fraction is rejected rather than truncated, so `?page=1.5` never silently becomes `1`.

```ts
import { queryInteger } from '@almighty-shogun/http-core';

const request = new Request('https://example.com/posts?page=3');

const page = queryInteger(request, 'page', 1);
```

### Type signature

```ts
declare function queryInteger(
    request: Request,
    name: string,
    fallback?: number
): number;
```

## queryNumber

Reads the value as a number, whole or fractional. `Infinity` and `NaN` are rejected, so only finite numbers are returned.

```ts
import { queryNumber } from '@almighty-shogun/http-core';

const request = new Request('https://example.com/photos?ratio=1.5');

const ratio = queryNumber(request, 'ratio', 1);
```

### Type signature

```ts
declare function queryNumber(
    request: Request,
    name: string,
    fallback?: number
): number;
```

## queryBoolean

Reads the value as a boolean. `true`, `1`, `yes`, and `on` read as `true`, and `false`, `0`, `no`, and `off` read as `false`, ignoring case and surrounding whitespace. A bare flag such as `?draft` also reads as `true`, because a present parameter with an empty value is how browsers and CLIs express one.

```ts
import { queryBoolean } from '@almighty-shogun/http-core';

const request = new Request('https://example.com/posts?draft');

const draft = queryBoolean(request, 'draft', false);
```

### Type signature

```ts
declare function queryBoolean(
    request: Request,
    name: string,
    fallback?: boolean
): boolean;
```

## queryDate

Reads the value as a Luxon `DateTime` via `DateTime.fromISO()`. An invalid `DateTime` is never returned, so callers never check `isValid`. This is the only export that pulls Luxon into a bundle; builds that never call it drop the dependency, because the package is side-effect free.

```ts
import { DateTime } from 'luxon';
import { queryDate } from '@almighty-shogun/http-core';

const request = new Request('https://example.com/posts?since=2026-01-01');

const since = queryDate(request, 'since', DateTime.now());
```

### Type signature

```ts
declare function queryDate(
    request: Request,
    name: string,
    fallback?: DateTime
): DateTime;
```

## queryList

Reads every value supplied for a parameter, accepting repeated parameters as in `?tag=a&tag=b`, comma-separated values as in `?tag=a,b`, and mixtures of the two, so `?tag=a,b&tag=c` gives `['a', 'b', 'c']`.

Values are trimmed and empty ones dropped, so `?tag=a,%20b,,c` also gives `['a', 'b', 'c']`. A parameter left with no values, including a bare `?tag=`, counts as absent and falls back or throws.

```ts
import { queryList } from '@almighty-shogun/http-core';

const request = new Request('https://example.com/posts?tag=a,b&tag=c');

const tags = queryList(request, 'tag');
```

### Type signature

```ts
declare function queryList(
    request: Request,
    name: string,
    fallback?: string[]
): string[];
```

## queryNumericList

Reads the same shapes as [`queryList()`](#querylist) and parses every value as a number, so `?id=1,2&id=3` gives `[1, 2, 3]`. Splitting, trimming, and dropping empty values all work identically, which means `?id=1,%202,,3` gives the same result.

A value that is not a finite number is treated as an unparseable parameter: the fallback is returned when there is one, and an [`InvalidParameterError`](./errors#invalidparametererror) is thrown when there is not. The list is never returned half-parsed.

```ts
import { queryNumericList } from '@almighty-shogun/http-core';

const request = new Request('https://example.com/posts?id=1,2&id=3');

const ids = queryNumericList(request, 'id');
```

### Type signature

```ts
declare function queryNumericList(
    request: Request,
    name: string,
    fallback?: number[]
): number[];
```
