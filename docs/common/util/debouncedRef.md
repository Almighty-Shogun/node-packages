---
outline: deep

params:
    - name: initialValue
      description: Initial value, ref, or getter used to seed the debounced ref.
      type: MaybeRefOrGetter<T>

    - name: delay
      description: Debounce delay in milliseconds.
      type: number

    - name: immediate
      description: Whether the first debounced assignment should trigger immediately.
      type: boolean
      optional: true
      defaultValue: 'false'

returns: A Vue ref whose setter triggers after the debounce delay.
---

# debouncedRef

Creates a Vue ref with a debounced setter. Writes update the internal state and trigger subscribers after the delay, using `requestAnimationFrame()` inside the timeout callback.

When the initial value is itself a ref, external changes to that source ref are mirrored into the debounced ref.

## Importing

```ts
import { debouncedRef } from '@almighty-shogun/common';
```

## Usage

```ts
import { watch } from 'vue';
import { debouncedRef } from '@almighty-shogun/common';

const search = debouncedRef('', 300);

watch(search, value => {
    void fetch('/api/search?q=' + encodeURIComponent(value));
});
```

<FrontmatterDocs/>

## Type signature

```ts
declare function debouncedRef<T>(
    initialValue: MaybeRefOrGetter<T>,
    delay: number,
    immediate?: boolean
): Ref<T>;
```
