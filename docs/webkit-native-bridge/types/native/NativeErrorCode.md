---
outline: deep

params:
    - name: TRequests
      description: Request map containing the method definition.

    - name: TMethod
      description: Method key whose native error code should be resolved.

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeErrorCode

Extracts the native error code union for a method from a request map. If the method does not define an `errorCode`, the type falls back to `string`.

## Importing

```ts
import type { NativeErrorCode } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeErrorCode } from '@almighty-shogun/webkit-native-bridge'

type Requests = {
    getUser: {
        body: { id: string }
        response: { name: string }
        errorCode: 'USER_NOT_FOUND'
    }
}

type GetUserCode = NativeErrorCode<Requests, 'getUser'>

// 'USER_NOT_FOUND'
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeErrorCode<
    TRequests extends NativeBridgeRequestMap,
    TMethod extends keyof TRequests
> =
    TRequests[TMethod] extends {
        errorCode?: infer TErrorCode extends string
    }
        ? TErrorCode
        : string;
```
