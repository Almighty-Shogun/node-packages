---
outline: deep

returns:
    - name: isOpen
      description: Current open state. Starts as `false`.
      type: Ref<boolean>

    - name: 'open(): void'
      description: Sets `isOpen` to `true`.

    - name: 'close(): void'
      description: Sets `isOpen` to `false`.

    - name: 'toggle(): void'
      description: Flips the current open state.
---

# useOpen

Creates a small open/closed state controller for UI components. It works well for modals, drawers, dropdown menus, popovers, and any component where the template should read from one boolean ref and call named actions.

The returned functions are intentionally simple and synchronous, which makes them easy to pass to event handlers or expose from a component.

## Importing

```ts
import { useOpen } from '@almighty-shogun/vue-utils'
```

## Usage

```vue
<template>
    <button @click="open">Open settings</button>

    <dialog :open="isOpen">
        <h2>Settings</h2>
        <button @click="close">Close</button>
    </dialog>
</template>

<script setup lang="ts">
import { useOpen } from '@almighty-shogun/vue-utils'

const { isOpen, open, close } = useOpen();
</script>
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useOpen(): UseOpen;

type UseOpen = {
    readonly isOpen: Ref<boolean>;

    open(): void;
    close(): void;
    toggle(): void;
};
```
