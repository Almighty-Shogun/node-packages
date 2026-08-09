---
outline: deep

params:
    - name: error
      description: Bridge error to map.
      type: BridgeError<TCode, TDetails>

returns: A [`ResolvedBridgeError`](../types#resolvedbridgeerror) with the original type, code, details, and a guaranteed non-null message string.
---

# mapBridgeError

Converts a bridge error into a resolved error object with a guaranteed string message. Use it when UI or logging code should not deal with nullable error messages.

## Importing

```ts
import { mapBridgeError } from '@almighty-shogun/webkit-native-bridge';
```

## Usage

```ts
import {
    createNativeBridge,
    mapBridgeError
} from '@almighty-shogun/webkit-native-bridge';

type Requests = {
    ping: {
        body: void;
        response: 'pong'
    }
};

const bridge = createNativeBridge<Requests>();
const response = await bridge.request('ping');

if (!response.ok) {
    const resolved = mapBridgeError(response.error);

    console.error(resolved.message);
}
```

<FrontmatterDocs/>

## Type signature

```ts
declare function mapBridgeError<TCode extends string, TDetails>(
    error: BridgeError<TCode, TDetails>
): ResolvedBridgeError;
```
