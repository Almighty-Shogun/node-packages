---
outline: deep

params:
    - name: TRequests
      type: NativeBridgeRequestMap
      description: Request map containing the method definition.

    - name: TMethod
      type: keyof TRequests
      description: Method key whose response body should be resolved.

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeResponseBody

Extracts the success response payload type for one method in a request map. It keeps response handling tied to the method being called.

## Importing

```ts
import type { NativeResponseBody } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeResponseBody } from '@almighty-shogun/webkit-native-bridge'

type Requests = {
    getUser: { body: { id: string }; response: { name: string } }
}

type GetUserResponse = NativeResponseBody<Requests, 'getUser'>;

// { name: string }
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeResponseBody<
    TRequests extends NativeBridgeRequestMap,
    TMethod extends keyof TRequests
> =
    TRequests[TMethod]['response'];
```
