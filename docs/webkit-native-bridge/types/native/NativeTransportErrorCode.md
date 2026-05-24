---
outline: deep

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeTransportErrorCode

Union of error codes produced by the JavaScript bridge layer. These codes describe failures before or around native handling rather than business errors returned by native code.

## Importing

```ts
import type { NativeTransportErrorCode } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeTransportErrorCode } from '@almighty-shogun/webkit-native-bridge'

const retryable: NativeTransportErrorCode[] = ['TIMEOUT', 'UNAVAILABLE'];
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeTransportErrorCode =
    | 'TIMEOUT'
    | 'UNAVAILABLE'
    | 'DISPOSED'
    | 'UNKNOWN';
```
