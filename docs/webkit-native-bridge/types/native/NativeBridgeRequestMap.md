---
outline: deep

returns: A TypeScript map type used to derive request method names, request body types, response payloads, and native error metadata. It is erased at runtime.
---

# NativeBridgeRequestMap

Defines the request contract shared by JavaScript and native code. Each key is a method name that can be passed to `bridge.request()`, and each value describes the request body, success response payload, and optional native error code or details.

A precise request map is what gives `createNativeBridge` its type safety: methods with `body: void` can be called without a body, methods with structured bodies require that body, and each method resolves to its own response type.

## Importing

```ts
import type { NativeBridgeRequestMap } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import { createNativeBridge } from '@almighty-shogun/webkit-native-bridge'
import type { NativeBridgeRequestMap } from '@almighty-shogun/webkit-native-bridge'

type Requests = {
    getUser: {
        body: { id: string }
        response: { id: string; name: string }
        errorCode: 'USER_NOT_FOUND'
        errorDetails: { id: string }
    }
    getVersion: {
        body: void
        response: { version: string }
    }
}

const bridge = createNativeBridge<Requests>()

await bridge.request('getUser', { id: '1' })
await bridge.request('getVersion')
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeBridgeRequestMap = Record<string, {
    body: unknown;
    response: unknown;
    errorCode?: string;
    errorDetails?: unknown;
}>;
```
