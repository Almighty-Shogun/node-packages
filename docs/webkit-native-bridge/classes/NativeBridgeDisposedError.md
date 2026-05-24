---
outline: deep

returns: A native bridge disposed error instance.
---

# NativeBridgeDisposedError

Error used when bridge methods are called after `dispose()`. This protects callers from sending messages through a bridge that has intentionally been shut down.

## Importing

```ts
import { NativeBridgeDisposedError } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import { NativeBridgeDisposedError } from '@almighty-shogun/webkit-native-bridge'

throw new NativeBridgeDisposedError();
```

<FrontmatterDocs/>

## Type signature

```ts
declare class NativeBridgeDisposedError extends NativeBridgeError {
    constructor();
}
```
