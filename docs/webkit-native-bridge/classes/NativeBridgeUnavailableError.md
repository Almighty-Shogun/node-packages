---
outline: deep

params:
    - name: handlerName
      description: Missing handler name.
      type: string

returns: A native bridge unavailable error instance.
---

# NativeBridgeUnavailableError

Error used when the configured WebKit message handler cannot be found. It usually means the code is running outside the native WebKit host, the handler name is wrong, or native setup has not completed yet.

## Importing

```ts
import { NativeBridgeUnavailableError } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import { NativeBridgeUnavailableError } from '@almighty-shogun/webkit-native-bridge'

throw new NativeBridgeUnavailableError('nativeBridge')
```

<FrontmatterDocs/>

## Type signature

```ts
declare class NativeBridgeUnavailableError extends NativeBridgeError {
    constructor(handlerName: string);
}
```
