---
outline: deep

returns: A required ref.
---

# requiredRef

Creates a Vue ref that must be assigned before it can be read. Accessing it too early throws immediately, which makes missing initialization obvious during development instead of failing later with `undefined` behavior.

The exported `RequiredRef<T>` type is the companion type for values returned by `requiredRef<T>()`.

## Importing

```ts
import { requiredRef, type RequiredRef } from '@almighty-shogun/vue-utils'
```

## Usage

```ts
import { requiredRef, type RequiredRef } from '@almighty-shogun/vue-utils'

const user = requiredRef<{ id: string; name: string }>()

user.value = { id: '1', name: 'Ada' }
```

<FrontmatterDocs/>

## Type signature

```ts
declare function requiredRef<T>(): RequiredRef<T>;

type RequiredRef<T> = Ref<T>;
```
