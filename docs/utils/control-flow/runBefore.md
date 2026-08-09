---
outline: deep

params:
    - name: before
      description: Callback to run before the wrapped function.
      type: () => void

returns: A wrapper factory that returns functions with the same parameters and return type.
---

# runBefore

Creates a function wrapper that runs a callback before the wrapped function. The original return value is preserved.

Use it for small cross-cutting actions such as marking state dirty, logging, or clearing an error before the main operation runs.

## Importing

```ts
import { runBefore } from '@almighty-shogun/utils';
```

## Usage

```ts
import { runBefore } from '@almighty-shogun/utils';

const withDirtyState = runBefore(() => {
    // Mark form dirty.
});

const updateName = withDirtyState((name: string) => name.trim());
```

<FrontmatterDocs/>

## Type signature

```ts
declare function runBefore<
    T extends (...args: any[]) => any
>(before: () => void): (fn: T) => T;
```
