---
outline: deep

params:
    - name: message
      description: Error message.
      type: string

returns: A native bridge error instance.
---

# NativeBridgeError

Base class for native bridge runtime errors. It provides a shared parent for bridge-specific failures so callers can distinguish them from unrelated application errors.

## Importing

```ts
import { NativeBridgeError } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import { NativeBridgeError } from '@almighty-shogun/webkit-native-bridge'

throw new NativeBridgeError('Bridge request failed')
```

<FrontmatterDocs/>

## Type signature

```ts
declare class NativeBridgeError extends Error {
    constructor(message: string);
}
```
