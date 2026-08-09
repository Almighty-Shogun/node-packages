---
outline: deep

params:
    - name: response
      description: Response to normalize.
      type: BridgeResponse<TData, TCode, TDetails>

returns: A response where success keeps its data payload and failure contains a normalized [`ResolvedBridgeError`](../types#resolvedbridgeerror).
---

# normalizeBridgeResponse

Normalizes a bridge response so the failure branch always contains a resolved error object. Successful responses keep their original data payload, while failures become easier to render or log consistently.

## Importing

```ts
import {
    normalizeBridgeResponse
} from '@almighty-shogun/webkit-native-bridge';
```

## Usage

```ts
import {
    createNativeBridge,
    normalizeBridgeResponse
} from '@almighty-shogun/webkit-native-bridge';

type Requests = {
    ping: {
        body: void;
        response: 'pong'
    }
};

const bridge = createNativeBridge<Requests>();
const normalized = normalizeBridgeResponse(await bridge.request('ping'));

if (!normalized.ok) {
    console.error(normalized.error.message);
}
```

<FrontmatterDocs/>

## Uses

- [mapBridgeError](./mapBridgeError)

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
