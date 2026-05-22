---
outline: deep

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeResponseEventDetail

Event detail payload expected by `handleResponse()`. Native code should dispatch this shape back to JavaScript so pending bridge requests can be resolved.

## Importing

```ts
import type { NativeResponseEventDetail } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

Use the TypeScript type to document the event detail shape expected by JavaScript. Native code should dispatch an event with the same structure after it has handled the request.

::: code-group

```ts [nativeResponseEvent.ts]
import type { NativeResponseEventDetail } from '@almighty-shogun/webkit-native-bridge'

const detail: NativeResponseEventDetail = {
    requestId: 'request-1',
    ok: true,
    payload: { name: 'Ada' },
    error: null
}
```

```cpp [bridgeResponse.cpp]
void resolveRequest(const std::string& requestId) {
    std::string script =
        "window.dispatchEvent(new CustomEvent('webkit-native-bridge', {"
        "detail: {"
        "requestId: '" + requestId + "',"
        "ok: true,"
        "payload: { version: '1.0.0' },"
        "error: null"
        "}"
        "}))";

    webView.evaluateJavaScript(script);
}
```

:::

<FrontmatterDocs/>

## Type signature

```ts
type NativeResponseEventDetail = {
    requestId: string;
    ok: boolean;
    payload: unknown;
    error: unknown;
};
```
