---
outline: deep

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeRequestOptions

Per-request options for `bridge.request()`. The `timeout` value overrides the bridge default for a single request, and `null` disables timeout handling for that request.

## Importing

```ts
import type { NativeRequestOptions } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeRequestOptions } from '@almighty-shogun/webkit-native-bridge'

const options: NativeRequestOptions = { timeout: 5000 };
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeRequestOptions = {
    timeout?: number | null;
};
```
