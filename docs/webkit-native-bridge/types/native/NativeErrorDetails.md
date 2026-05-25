---
outline: deep

params:
    - name: TRequests
      type: NativeBridgeRequestMap
      description: Request map containing the method definition.

    - name: TMethod
      type: keyof TRequests
      description: Method key whose native error details should be resolved.

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeErrorDetails

Extracts the native error details type for a method from a request map. If the method does not define `errorDetails`, the type falls back to `unknown`.

## Importing

```ts
import type { NativeErrorDetails } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeErrorDetails } from '@almighty-shogun/webkit-native-bridge'

type Requests = {
    getUser: {
        body: { id: string }
        response: { name: string }
        errorDetails: { id: string }
    }
}

type GetUserDetails = NativeErrorDetails<Requests, 'getUser'>;

// { id: string }
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeErrorDetails<
    TRequests extends NativeBridgeRequestMap,
    TMethod extends keyof TRequests
> =
    TRequests[TMethod] extends { errorDetails?: infer TErrorDetails }
        ? TErrorDetails
        : unknown;
```
