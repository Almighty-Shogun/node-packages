---
outline: deep

params:
    - name: options.eventName
      description: DOM event name used for native responses. Defaults to `webkit-native-bridge`.
      type: string

    - name: options.handlerName
      description: WebKit message handler name under `window.webkit.messageHandlers`. Defaults to `nativeBridge`.
      type: string

    - name: options.requestTimeout
      description: Default request timeout in milliseconds. Defaults to `30000`; use `null` to disable request timeouts.
      type: number | null

    - name: options.window
      description: Optional window-like object. Useful for tests or custom runtimes.
      type: NativeBridgeWindow

returns:
    - name: call(method)
      description: Sends a fire-and-forget command string to native code.

    - name: request(method, body, options)
      description: Sends a typed request and resolves to a `BridgeResponse`.

    - name: postMessage(message)
      description: Sends a raw message through the configured WebKit handler.

    - name: handleResponse(detail)
      description: Manually resolves a pending request from a native response detail.

    - name: isAvailable()
      description: Returns whether the configured WebKit message handler exists.

    - name: dispose()
      description: Removes the response listener and resolves pending requests as disposed failures.
---

# createNativeBridge

Creates a typed JavaScript bridge for WebKit message handlers. It can send fire-and-forget commands with `call()`, send typed request messages with `request()`, and resolve native responses through DOM events.

Each request gets a generated request ID and is stored until native code responds, the timeout expires, or the bridge is disposed. Instead of throwing for request failures, `request()` resolves to a discriminated `BridgeResponse`, so callers can handle success and failure with an explicit `response.ok` branch.

## Importing

```ts
import { createNativeBridge } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

The TypeScript side defines the bridge contract and sends requests through the configured WebKit message handler. The C++ side receives those messages, handles the native work, and dispatches a response event with the same request ID.

::: code-group

```ts [nativeBridge.ts]
import { createNativeBridge } from '@almighty-shogun/webkit-native-bridge'

type Requests = {
    getUser: {
        body: { id: string }
        response: { id: string; name: string }
        errorCode: 'USER_NOT_FOUND'
        errorDetails: { id: string }
    }
    ping: {
        body: void
        response: 'pong'
    }
}

type Commands = 'close' | 'openSettings';

const bridge = createNativeBridge<Requests, Commands>({
    handlerName: 'nativeBridge',
    requestTimeout: 15000
});

bridge.call('openSettings');

const response = await bridge.request('getUser', { id: '1' });

if (response.ok) {
    console.log(response.data.name);
} else {
    console.error(response.error.code, response.message);
}

const ping = await bridge.request('ping');

bridge.dispose();
```

```cpp [bridgeHandler.cpp]
// Sketch of the native-side flow. Exact WebKit APIs differ per platform.
void handleScriptMessage(const std::string& message) {
    // request:<requestId>|getUser|{"id":"1"}
    auto requestId = parseRequestId(message);
    auto method = parseMethod(message);

    if (method == "getUser") {
        dispatchBridgeResponse(requestId, true, R"({"id":"1","name":"Ada"})");
        return;
    }

    dispatchBridgeError(requestId, "UNKNOWN_METHOD", "Unsupported native method");
}

void dispatchBridgeResponse(
    const std::string& requestId,
    bool ok,
    const std::string& payloadJson
) {
    std::string script =
        "window.dispatchEvent(new CustomEvent('webkit-native-bridge', {"
        "detail: { requestId: '" + requestId + "', ok: true, payload: " + payloadJson + ", error: null }"
        "}))";

    webView.evaluateJavaScript(script);
}
```

:::

<FrontmatterDocs/>

## Type signature

```ts
declare function createNativeBridge<
    TRequests extends NativeBridgeRequestMap = Record<never, never>,
    TCommands extends string = never
>(options?: NativeBridgeOptions): NativeBridge<TRequests, TCommands>;
```
