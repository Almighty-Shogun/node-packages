# Errors

Runtime failures thrown by the bridge itself. Each is its own class extending `Error` directly, and each sets `name` to its own class name, which survives minification.

Both are thrown rather than returned, unlike a native or transport failure, which comes back as a [`BridgeResponse`](./types#bridgeresponse) with `ok: false`. These two mean the bridge could not be used at all, so there is no response to resolve.

## NativeBridgeUnavailableError

Thrown when the configured WebKit message handler cannot be found. It usually means the code is running outside the native WebKit host, the handler name is wrong, or native setup has not completed yet.

It carries the handler name it looked for as a readonly `handlerName` field, so a handler can report which bridge was missing without parsing the message.

```ts
import {
    NativeBridgeUnavailableError
} from '@almighty-shogun/webkit-native-bridge';

throw new NativeBridgeUnavailableError('nativeBridge');
```

### Type signature

```ts
declare class NativeBridgeUnavailableError extends Error {
    readonly handlerName: string;

    constructor(handlerName: string);
}
```

## NativeBridgeDisposedError

Thrown when a bridge is used after `dispose()` has been called. Disposing removes the response listener and resolves every pending request, so a disposed bridge can never resolve another one.

```ts
import {
    NativeBridgeDisposedError
} from '@almighty-shogun/webkit-native-bridge';

throw new NativeBridgeDisposedError();
```

### Type signature

```ts
declare class NativeBridgeDisposedError extends Error {
    constructor();
}
```
