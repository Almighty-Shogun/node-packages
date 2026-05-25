---
outline: deep

returns:
    - name: isLoading
      description: '`true` while the wrapped task is pending.'
      type: Ref<boolean>

    - name: 'load<T>(task: Promise<T> | (() => Promise<T>)): Promise<T>'
      description: Runs or awaits the task while managing `isLoading`.
---

# useLoaded

Wraps asynchronous work with a loading flag. It accepts either an existing promise or a function that returns a promise, sets `isLoading` before running it, and resets the flag in `finally`.

Because cleanup happens in `finally`, the loading state is restored for both successful and failed tasks. The original resolved value or rejection is preserved, so callers can keep normal async error handling.

## Importing

```ts
import { useLoaded } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { useLoaded } from '@almighty-shogun/vue-utils'

const { isLoading, load } = useLoaded();

async function submit() {
    try {
        await load(() => fetch('/api/profile', { method: 'POST' }));
    } catch (error) {
        console.error('Saving profile failed', error);
    }
}
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useLoaded(): UseLoaded;

type UseLoaded = {
    readonly isLoading: Ref<boolean>;

    load<T>(task: Promise<T> | (() => Promise<T>)): Promise<T>;
};
```
