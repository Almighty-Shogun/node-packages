---
outline: deep

params:
    - name: options
      description: Response event name, WebKit handler name, default request timeout, and window-like runtime object.
      type: NativeBridgeOptions
      optional: true
      defaultValue: '{}'

returns:
    - name: 'call(method: TCommands): void'
      description: Sends a fire-and-forget command string to native code. Throws when the bridge is disposed or the handler is missing.

    - name: 'request(method: TMethod, body?: Undefinable<NativeRequestBody>, options?: Undefinable<NativeRequestOptions>): Promise<BridgeResponse>'
      description: Sends a typed request and resolves to a [`BridgeResponse`](../types#bridgeresponse). The `body` argument is required for methods whose contract declares one.

    - name: 'postMessage(message: string): void'
      description: Sends a raw message through the configured WebKit handler. Throws when the bridge is disposed or the handler is missing.

    - name: 'handleResponse(detail: NativeResponseEventDetail): void'
      description: Manually resolves a pending request from a native response detail.

    - name: 'isAvailable(): boolean'
      description: Returns whether the configured WebKit message handler exists.

    - name: 'dispose(): void'
      description: Removes the response listener and resolves pending requests as disposed failures.
---

# createNativeBridge

Creates a typed JavaScript bridge for WebKit message handlers. It can send fire-and-forget commands with `call()`, send typed request messages with `request()`, and resolve native responses through DOM events.

Each request gets a generated request ID and is stored until native code responds, the timeout expires, or the bridge is disposed. Rather than rejecting, `request()` resolves to a discriminated [`BridgeResponse`](../types#bridgeresponse), so callers handle success and failure with an explicit `response.ok` branch.

Every field of [`NativeBridgeOptions`](../types#nativebridgeoptions) has a default: `handlerName` is `nativeBridge`, `eventName` is `webkit-native-bridge`, `requestTimeout` is `30000` milliseconds, and `window` falls back to the global `window` when one exists. Set `requestTimeout` to `null` to disable request timeouts entirely.

## Importing

```ts
import { createNativeBridge } from '@almighty-shogun/webkit-native-bridge';
```

## Usage

The TypeScript side defines the bridge contract and sends requests through the configured WebKit message handler. The native side receives those messages, does the work, and dispatches a response event carrying the same request ID.

Two message shapes arrive at the handler. `call()` posts the bare command string, while `request()` posts `request:<requestId>|<method>|<body>`, where the body is the JSON request percent-encoded with `encodeURIComponent`. Because that encoding escapes `|` as `%7C`, splitting the message on `|` is safe.

::: code-group

```ts [nativeBridge.ts]
import { createNativeBridge } from '@almighty-shogun/webkit-native-bridge';

type Requests = {
    getUser: {
        body: { id: string };
        response: { id: string; name: string };
        errorCode: 'USER_NOT_FOUND';
        errorDetails: { id: string };
    };
    ping: {
        body: void;
        response: 'pong';
    };
};

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

```swift [BridgeHandler.swift]
import WebKit

final class BridgeHandler: NSObject, WKScriptMessageHandler {
    weak var webView: WKWebView?

    func userContentController(
        _ controller: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        guard let body = message.body as? String else {
            return
        }

        guard body.hasPrefix("request:") else {
            handleCommand(body)
            return
        }

        let parts = body.dropFirst("request:".count)
            .split(separator: "|", maxSplits: 2)

        guard parts.count == 3 else {
            return
        }

        let requestId = String(parts[0])
        let method = String(parts[1])
        let json = String(parts[2]).removingPercentEncoding ?? "null"

        print("\(method) called with \(json)")

        if method == "getUser" {
            dispatch(
                requestId: requestId,
                ok: true,
                payload: #"{"id":"1","name":"Ada"}"#
            )
        } else {
            dispatch(requestId: requestId, ok: false, payload: "null")
        }
    }

    private func handleCommand(_ command: String) {
        // 'close', 'openSettings', and any other fire-and-forget command.
    }

    private func dispatch(requestId: String, ok: Bool, payload: String) {
        let script = """
        window.dispatchEvent(new CustomEvent('webkit-native-bridge', {
            detail: {
                requestId: '\(requestId)',
                ok: \(ok),
                payload: \(payload),
                error: null
            }
        }))
        """

        DispatchQueue.main.async {
            self.webView?.evaluateJavaScript(script)
        }
    }
}
```

```cpp [bridgeHandler.cpp]
// Sketch of the native-side flow. Exact WebKit APIs differ per platform.
void handleScriptMessage(const std::string& message) {
    // request:<requestId>|getUser|%7B%22id%22%3A%221%22%7D
    if (message.rfind("request:", 0) != 0) {
        handleCommand(message);
        return;
    }

    auto requestId = parseRequestId(message);
    auto method = parseMethod(message);
    auto json = percentDecode(parseBody(message));

    if (method == "getUser") {
        dispatchBridgeResponse(
            requestId,
            true,
            R"({"id":"1","name":"Ada"})"
        );

        return;
    }

    dispatchBridgeError(
        requestId,
        "UNKNOWN_METHOD",
        "Unsupported native method"
    );
}

void dispatchBridgeResponse(
    const std::string& requestId,
    bool ok,
    const std::string& payloadJson
) {
    std::string script =
        "window.dispatchEvent(new CustomEvent("
        "'webkit-native-bridge', { detail: { requestId: '" + requestId
        + "', ok: " + (ok ? "true" : "false")
        + ", payload: " + payloadJson
        + ", error: null } }))";

    webView.evaluateJavaScript(script);
}
```

:::

## Error handling

Most failures arrive as a resolved failure response, but not all of them, and the difference is worth knowing:

- **Timeout, missing handler, or disposal while in flight** resolve to a failure with a [`NativeTransportErrorCode`](../types#nativetransporterrorcode) of `TIMEOUT`, `UNAVAILABLE`, or `DISPOSED`. These never throw.
- **Calling `request()` on an already-disposed bridge throws** `NativeBridgeDisposedError` synchronously, before the promise is created. Guard with `isAvailable()` and your own disposal flag if a call can outlive `dispose()`.
- **`call()` and `postMessage()` always throw** rather than resolving, since they have no response to carry an error. They raise `NativeBridgeDisposedError` after disposal and [`NativeBridgeUnavailableError`](../classes/NativeBridgeUnavailableError) when the configured handler is missing.

Errors reported by native code resolve as failures with `type: 'native'`, which [`isNativeError`](./isNativeError) narrows.

<FrontmatterDocs/>

## Uses

- [NullableOrUndefinable](../../utils/types#nullableorundefinable)
- [Undefinable](../../utils/types#undefinable)

## Type signature

```ts
declare function createNativeBridge<
    TRequests extends NativeBridgeRequestMap = Record<never, never>,
    TCommands extends string = never
>(options?: NativeBridgeOptions): NativeBridge<TRequests, TCommands>;
```
