---
outline: deep

params:
    - name: TRequests
      description: Request map to inspect for methods requiring a body.

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeMethodsWithBody

Extracts request method keys whose body type is neither `void` nor `undefined`. These methods require a body argument when calling `bridge.request()`.

## Importing

```ts
import type { NativeMethodsWithBody } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeMethodsWithBody } from '@almighty-shogun/webkit-native-bridge'

type Requests = {
    getUser: { body: { id: string }; response: { name: string } }
    ping: { body: void; response: 'pong' }
}

type MethodsRequiringBody = NativeMethodsWithBody<Requests>

// 'getUser'
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeMethodsWithBody<TRequests extends NativeBridgeRequestMap> =
    Exclude<keyof TRequests, NativeMethodsWithoutBody<TRequests>>;
```
