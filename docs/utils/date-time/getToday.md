---
outline: deep

returns: Today as a date string.
---

# getToday

Returns the current local date as `yyyy-MM-dd`. This is useful for date input defaults, API query parameters, and comparing against stored ISO-like date strings.

## Importing

```ts
import { getToday } from '@almighty-shogun/utils'
```

## Usage

```ts
import { getToday } from '@almighty-shogun/utils'

const today = getToday();

// '2026-05-20'
```

<FrontmatterDocs/>

## Type signature

```ts
declare function getToday(): string;
```
