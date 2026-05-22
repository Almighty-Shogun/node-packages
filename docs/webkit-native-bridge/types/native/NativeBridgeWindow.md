---
outline: deep

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeBridgeWindow

Window shape expected by the WebKit bridge. It extends `Window` with the optional `webkit.messageHandlers` object used by WebKit hosts.

## Importing

```ts
import type { NativeBridgeWindow } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeBridgeWindow } from '@almighty-shogun/webkit-native-bridge'

function hasBridge(window: NativeBridgeWindow) {
    return window.webkit?.messageHandlers?.nativeBridge !== undefined
}
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeBridgeWindow = Window & {
    webkit?: {
        messageHandlers?: Record<
            string,
            NativeBridgeMessageHandler | undefined
        >;
    };
};
```
