---
outline: deep

params:
    - name: response
      description: Response to normalize.
      type: BridgeResponse<TData, TCode, TDetails>

returns: A response where success keeps its data payload and failure contains a normalized `ResolvedBridgeError`.
---

# normalizeBridgeResponse

Normalizes a bridge response so the failure branch always contains a resolved error object. Successful responses keep their original data payload, while failures become easier to render or log consistently.

## Importing

```ts
import { normalizeBridgeResponse } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import { normalizeBridgeResponse } from '@almighty-shogun/webkit-native-bridge'

const normalized = normalizeBridgeResponse(response);

if (!normalized.ok) {
    console.error(normalized.error.message);
}
```

<FrontmatterDocs/>

## Type signature

```ts
declare function normalizeBridgeResponse<
    TData,
    TCode extends string,
    TDetails
>(
    response: BridgeResponse<TData, TCode, TDetails>
): NormalizedBridgeResponse<TData>;
```


## Uses

- [mapBridgeError](./mapBridgeError)
