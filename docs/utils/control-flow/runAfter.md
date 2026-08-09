---
outline: deep

params:
    - name: after
      description: Callback to run after the wrapped function returns.
      type: () => void

returns: A wrapper factory that returns functions with the same parameters and return type.
---

# runAfter

Creates a function wrapper that runs a callback after the wrapped function returns. The original return value is preserved.

The `after` callback is not placed in a `finally` block, so it does not run when the wrapped function throws.

## Importing

```ts
import { runAfter } from '@almighty-shogun/utils';
```

## Usage

```ts
import { runAfter } from '@almighty-shogun/utils';

const withRefresh = runAfter(() => {
    // Refresh local state.
});

const save = withRefresh((name: string) => name.trim());
```

<FrontmatterDocs/>

## Type signature

```ts
declare function runAfter<
    T extends (...args: any[]) => any
>(after: () => void): (fn: T) => T;
```
