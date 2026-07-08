---
outline: deep

params:
    - name: spec
      description: Initial form shape.
      type: T

returns:
    - name: form
      description: Mutable form state cloned from the initial `spec`.
      type: Ref<T>

    - name: 'reset(): void'
      description: Replaces `form.value` with a fresh clone of the original `spec`.
---

# useForm

Creates mutable form state from a structured clone of an initial specification. Calling `reset()` restores a fresh clone of that original shape, which is useful after submitting or cancelling a form.

## Importing

```ts
import { useForm } from '@almighty-shogun/common'
```

## Usage

```ts
import { useForm } from '@almighty-shogun/common'

const { form, reset } = useForm({ email: '', password: '' });

form.value.email = 'ada@example.com';
reset();
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useForm<T>(spec: T): UseForm<T>;

type UseForm<T> = {
    readonly form: Ref<T>;

    reset(): void;
};
```
