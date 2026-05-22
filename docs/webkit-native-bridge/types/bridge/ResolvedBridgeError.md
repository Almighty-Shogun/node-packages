---
outline: deep

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# ResolvedBridgeError

Non-null error shape produced by `mapBridgeError`. It is useful for UI and logging paths that need a guaranteed message string.

## Importing

```ts
import type { ResolvedBridgeError } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { ResolvedBridgeError } from '@almighty-shogun/webkit-native-bridge'

function logError(error: ResolvedBridgeError) {
    console.error(error.message)
}
```

<FrontmatterDocs/>

## Type signature

```ts
type ResolvedBridgeError = {
    type: 'native' | 'transport';
    code: string;
    message: string;
    details: unknown;
};
```
