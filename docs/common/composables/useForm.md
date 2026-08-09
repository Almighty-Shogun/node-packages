---
outline: deep

params:
    - name: spec
      description: Initial form shape.
      type: MaybeRefOrGetter<T>

returns:
    - name: form
      description: Mutable form state cloned from the initial `spec`.
      type: Ref<T>

    - name: 'reset(): void'
      description: Replaces `form.value` with a fresh clone of the original `spec`.
---

# useForm

Creates mutable form state from a structured clone of an initial specification. Calling `reset()` resolves the original value again and replaces the form with a fresh clone, which is useful after submitting or cancelling a form.

::: warning
Cloning uses `structuredClone()`, so the specification must be structurally cloneable. `Date`, `Map`, `Set`, and nested plain objects survive, but a spec containing a function or a DOM node throws a `DataCloneError`, and a class instance is copied as a plain object without its prototype or methods. Keep the spec to plain form data.
:::

## Importing

```ts
import { useForm } from '@almighty-shogun/common';
```

## Usage

```ts
import { useForm } from '@almighty-shogun/common';

const { form, reset } = useForm({ email: '', password: '' });

form.value.email = 'ada@example.com';
reset();
```

<FrontmatterDocs/>

## Type signature

```ts
declare function useForm<T>(spec: MaybeRefOrGetter<T>): UseForm<T>;

type UseForm<T> = {
    readonly form: Ref<T>;

    reset(): void;
};
```
