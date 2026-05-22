---
outline: deep

params:
    - name: T
      description: Success payload type stored in `data`.

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# BridgeSuccess

Represents a successful bridge response. The `ok: true` discriminator lets TypeScript narrow the response and safely expose the `data` payload.

## Importing

```ts
import type { BridgeSuccess } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { BridgeSuccess } from '@almighty-shogun/webkit-native-bridge'

const response: BridgeSuccess<{ id: string }> = {
    ok: true,
    message: null,
    data: { id: '1' }
}
```

<FrontmatterDocs/>

## Type signature

```ts
type BridgeSuccess<T> = {
    ok: true;
    message: string | null;
    data: T;
};
```
