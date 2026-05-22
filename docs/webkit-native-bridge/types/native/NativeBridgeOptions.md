---
outline: deep

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeBridgeOptions

Configuration object for `createNativeBridge`. Use it to customize the event name, WebKit handler name, default request timeout, or target window.

## Importing

```ts
import type { NativeBridgeOptions } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeBridgeOptions } from '@almighty-shogun/webkit-native-bridge'

const options: NativeBridgeOptions = {
    handlerName: 'nativeBridge',
    requestTimeout: 15000
}
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeBridgeOptions = {
    eventName?: string;
    handlerName?: string;
    requestTimeout?: number | null;
    window?: NativeBridgeWindow;
};
```
