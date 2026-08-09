---
outline: deep

params:
    - name: value
      description: Text value, ref, or getter to write to the clipboard.
      type: MaybeRefOrGetter<string>

    - name: onSuccess
      description: Callback invoked after the clipboard write succeeds.
      type: Undefinable<Function>
      optional: true

returns: A function that writes the current value to the clipboard.
---

# useClipboard

Creates a clipboard-copy action for Vue components. The copied text is resolved with `toValue()` when the returned function is called, so refs and getters are read lazily instead of being captured at setup time.

The optional success callback runs only when the underlying clipboard write succeeds.

## Importing

```ts
import { useClipboard } from '@almighty-shogun/common';
```

## Usage

```vue
<template>
    <button @click="copyInviteLink">Copy invite link</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '@almighty-shogun/common';

const inviteLink = computed(() => window.location.href);
const copyInviteLink = useClipboard(inviteLink);
</script>
```

<FrontmatterDocs/>

## Uses

- [Undefinable](../../utils/types#undefinable)
- [copyToClipboard](../../utils/browser-dom/copyToClipboard)

## Type signature

```ts
declare function useClipboard(
    value: MaybeRefOrGetter<string>,
    onSuccess?: Undefinable<Function>
): UseClipboard;

type UseClipboard = () => void;
```
