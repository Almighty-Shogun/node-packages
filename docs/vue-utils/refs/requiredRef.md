---
outline: deep

returns: A required ref.
---

# requiredRef

Creates a Vue ref that must be assigned before it can be read. Accessing it too early throws immediately, which makes missing initialization obvious during development instead of failing later with `undefined` behavior.

The helper returns a normal `Ref<T>`, so it works anywhere a Vue ref is accepted. The difference is runtime behavior: the first read before assignment throws an error, which is useful for template refs, injected state, or values that are initialized by a lifecycle step.

## Importing

```ts
import { requiredRef } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { requiredRef } from '@almighty-shogun/vue-utils'

const user = requiredRef<{ id: string; name: string }>();

user.value = { id: '1', name: 'Ada' };
```

<FrontmatterDocs/>

## Type signature

```ts
declare function requiredRef<T>(): Ref<T>;
```
