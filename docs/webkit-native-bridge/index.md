# WebKit Native Bridge

A typed request/response bridge for JavaScript running inside a WebKit host application. The JavaScript side posts messages to `window.webkit.messageHandlers`, while the native host handles those messages and dispatches response events back into the page. The host language does not matter: Swift and Objective-C are usual on Apple platforms, C++ for WebKit embedders.

The package is useful when a Web UI is embedded in a native application and needs a reliable contract for commands, requests, successful payloads, native errors, and transport failures.

## Categories

- [Bridge](./functions/createNativeBridge) &mdash; [`createNativeBridge`](./functions/createNativeBridge) creates the typed bridge.
- [Utilities](./functions/normalizeBridgeResponse) &mdash; [`normalizeBridgeResponse`](./functions/normalizeBridgeResponse) and [`mapBridgeError`](./functions/mapBridgeError) flatten a response into one shape, and [`isNativeError`](./functions/isNativeError), [`isTransportError`](./functions/isTransportError), and [`getErrorDetailsAs`](./functions/getErrorDetailsAs) inspect a failure.
- [Errors](./errors) &mdash; runtime errors for unavailable and disposed bridge states.
- [Types](./types) &mdash; bridge responses, request maps, transport error codes, bridge and request options, and event details.

## Dependencies

- [`@almighty-shogun/utils`](../utils/) &mdash; a direct dependency, used for shared utility types only and never at runtime.
- Browser APIs &mdash; a `window` object with `webkit.messageHandlers` and DOM event support.

## Native integration

JavaScript sends messages to the configured WebKit handler. The native side should parse the message, perform the requested action, and dispatch a `CustomEvent` with the same request ID so the pending JavaScript promise can resolve.

## Quick example

```ts
import { createNativeBridge } from '@almighty-shogun/webkit-native-bridge';

type Requests = {
    ping: { body: void; response: 'pong' };
};

const bridge = createNativeBridge<Requests>();
const response = await bridge.request('ping');
```

Continue with [installation](./installation) or jump to a category from the sidebar.
