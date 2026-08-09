---
outline: deep

returns:
    - name: isLoading
      description: '`true` while the wrapped task is pending.'
      type: Ref<boolean>

    - name: 'load<T>(task: PromiseOrGetter<T>): Promise<T>'
      description: Runs or awaits a `PromiseOrGetter<T>` while managing `isLoading`.
---

# useLoaded

Wraps asynchronous work with a loading flag. It accepts a [`PromiseOrGetter`](../../utils/types#promiseorgetter), sets `isLoading` before awaiting it, and resets the flag in `finally`.

Because cleanup happens in `finally`, the loading state is restored for both successful and failed tasks. The original resolved value or rejection is preserved, so callers can keep normal async error handling.

::: warning
`isLoading` is a plain flag rather than a counter, so overlapping calls do not nest: if two tasks run at once, the first to settle sets `isLoading` back to `false` while the second is still pending. Use one `useLoaded()` per concurrent operation when each needs its own state.
:::

## Importing

```ts
import { useLoaded } from '@almighty-shogun/common';
```

## Usage

```ts
import { useLoaded } from '@almighty-shogun/common';

const { isLoading, load } = useLoaded();

async function submit(): Promise<void> {
    try {
        await load(() => fetch('/api/profile', { method: 'POST' }));
    } catch (error) {
        console.error('Saving profile failed', error);
    }
}
```

<FrontmatterDocs/>

## Uses

- [PromiseOrGetter](../../utils/types#promiseorgetter)

## Type signature

```ts
declare function useLoaded(): UseLoaded;

type UseLoaded = {
    readonly isLoading: Ref<boolean>;

    load<T>(task: PromiseOrGetter<T>): Promise<T>;
};
```
