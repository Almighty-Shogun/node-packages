---
outline: deep

params:
    - name: ms
      description: Interval duration.
      type: MaybeRefOrGetter<number>

    - name: fn
      description: Function called by the interval.
      type: Function

returns:
    - name: 'start(): void'
      description: Clears any active interval and starts a new one with the current duration.

    - name: 'stop(): void'
      description: Clears the active interval.
---

# useInterval

Starts an interval when the component mounts, stops it when the component unmounts, and restarts it when the interval duration changes. Use it for polling, clocks, countdowns, or repeated UI updates.

Calling `start()` again always clears the running interval first, so it never leaves a duplicate timer behind.

::: warning
The composable registers `onMounted()` and `onUnmounted()`, so it has to be called during component setup. Called anywhere else the interval never starts and never stops.
:::

## Importing

```ts
import { useInterval } from '@almighty-shogun/common';
```

## Usage

```ts
import { ref } from 'vue';
import { useInterval } from '@almighty-shogun/common';

const count = ref(0);
const interval = useInterval(1000, () => count.value++);

interval.stop();
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useInterval(
    ms: MaybeRefOrGetter<number>,
    fn: Function
): UseInterval;

type UseInterval = {
    start(): void;
    stop(): void;
};
```
