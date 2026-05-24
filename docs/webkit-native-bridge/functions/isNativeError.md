---
outline: deep

params:
    - name: error
      description: Error to inspect.
      type: BridgeError<TCode, TDetails>

returns: '`true` when the error was returned by native code. TypeScript narrows `error.type` to `native` in the true branch.'
---

# isNativeError

Narrows a bridge error to a native error. Native errors are returned by the host application after it receives and handles the request.

## Importing

```ts
import { isNativeError } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import { isNativeError } from '@almighty-shogun/webkit-native-bridge'

if (!response.ok && isNativeError(response.error)) {
    console.warn('Native code rejected the request');
}
```

<FrontmatterDocs/>

## Type signature

```ts
declare function isNativeError<TCode extends string, TDetails>(
    error: BridgeError<TCode, TDetails>
): error is BridgeError<TCode, TDetails> & { type: 'native' };
```
