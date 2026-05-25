---
outline: deep

params:
    - name: TRequests
      type: NativeBridgeRequestMap
      description: Request map containing the method definition.

    - name: TMethod
      type: keyof TRequests
      description: Method key whose request body should be resolved.

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeRequestBody

Extracts the request body type for one method in a request map. It is used internally by the bridge request overloads and can also be reused in application code.

## Importing

```ts
import type { NativeRequestBody } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeRequestBody } from '@almighty-shogun/webkit-native-bridge'

type Requests = {
    getUser: { body: { id: string }; response: { name: string } }
}

type GetUserBody = NativeRequestBody<Requests, 'getUser'>;

// { id: string }
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeRequestBody<
    TRequests extends NativeBridgeRequestMap,
    TMethod extends keyof TRequests
> =
    TRequests[TMethod]['body'];
```
