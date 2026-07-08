---
outline: deep

returns: The current route name or an empty string.
---

# getCurrentRouteName

Returns the current Vue Router route name as a string. If the route has no name, it returns an empty string so callers can safely compare without handling `undefined`.

## Importing

```ts
import { getCurrentRouteName } from '@almighty-shogun/common'
```

## Usage

```ts
import { getCurrentRouteName } from '@almighty-shogun/common'

const routeName = getCurrentRouteName();
```

<FrontmatterDocs/>

## Type signature

```ts
declare function getCurrentRouteName(): string;
```
