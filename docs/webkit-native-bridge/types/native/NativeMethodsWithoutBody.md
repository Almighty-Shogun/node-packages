---
outline: deep

params:
    - name: TRequests
      description: Request map to inspect for methods that accept no body.

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeMethodsWithoutBody

Extracts request method keys whose body type is `void` or `undefined`. These methods can be called without a request body.

## Importing

```ts
import type { NativeMethodsWithoutBody } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeMethodsWithoutBody } from '@almighty-shogun/webkit-native-bridge'

type Requests = {
    getUser: { body: { id: string }; response: { name: string } }
    ping: { body: void; response: 'pong' }
}

type MethodsWithoutBody = NativeMethodsWithoutBody<Requests>

// 'ping'
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeMethodsWithoutBody<
    TRequests extends NativeBridgeRequestMap
> = {
    [TMethod in keyof TRequests]:
        [NativeRequestBody<TRequests, TMethod>] extends [void]
        ? TMethod
        : [NativeRequestBody<TRequests, TMethod>] extends [undefined]
            ? TMethod
            : never;
}[keyof TRequests];
```
