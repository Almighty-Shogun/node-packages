---
outline: deep

params:
    - name: error
      description: Error to inspect.
      type: BridgeError<TCode, TDetails>

returns: '`true` when the error came from the JavaScript transport layer. TypeScript narrows `error.type` to `transport` in the true branch.'
---

# isTransportError

Narrows a bridge error to a transport error. Transport errors come from the JavaScript bridge layer itself, such as timeouts, unavailable handlers, disposed bridges, or unexpected runtime failures.

## Importing

```ts
import { isTransportError } from '@almighty-shogun/webkit-native-bridge';
```

## Usage

```ts
import {
    createNativeBridge,
    isTransportError
} from '@almighty-shogun/webkit-native-bridge';

type Requests = {
    ping: {
        body: void;
        response: 'pong'
    }
};

const bridge = createNativeBridge<Requests>();
const response = await bridge.request('ping');

if (!response.ok && isTransportError(response.error)) {
    console.warn('Request did not reach native code');
}
```

<FrontmatterDocs/>

## Type signature

```ts
declare function isTransportError<TCode extends string, TDetails>(
    error: BridgeError<TCode, TDetails>
): error is BridgeError<TCode, TDetails> & { type: 'transport' };
```
