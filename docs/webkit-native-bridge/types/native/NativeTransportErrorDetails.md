---
outline: deep

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeTransportErrorDetails

Optional details attached to transport errors. The `cause` field can preserve the original error or runtime value that triggered the transport failure.

## Importing

```ts
import type { NativeTransportErrorDetails } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeTransportErrorDetails } from '@almighty-shogun/webkit-native-bridge'

const details: NativeTransportErrorDetails = { cause: new Error('Missing handler') }
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeTransportErrorDetails = {
    cause?: unknown;
};
```
