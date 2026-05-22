---
outline: deep

params:
    - name: TData
      description: Success payload type.

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NormalizedBridgeResponse

Response shape produced by `normalizeBridgeResponse`. Success responses keep their data, and failure responses use `ResolvedBridgeError` for predictable error handling.

## Importing

```ts
import type { NormalizedBridgeResponse } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NormalizedBridgeResponse } from '@almighty-shogun/webkit-native-bridge'

type NormalizedUser = NormalizedBridgeResponse<{ id: string }>
```

<FrontmatterDocs/>

## Type signature

```ts
type NormalizedBridgeResponse<TData> =
    | BridgeSuccess<TData>
    | {
        ok: false;
        error: ResolvedBridgeError;
    };
```
