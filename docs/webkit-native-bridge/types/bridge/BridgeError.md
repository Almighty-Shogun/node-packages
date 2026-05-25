---
outline: deep

params:
    - name: TCode
      type: string
      description: Error code union for the failure.
      defaultValue: 'string'

    - name: TDetails
      type: any
      description: Structured details returned with the error.
      defaultValue: 'unknown'

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# BridgeError

Describes a bridge error returned by either the native side or the transport layer. The `type` field separates native failures from JavaScript bridge failures, while `code` and `details` carry more specific error information.

## Importing

```ts
import type { BridgeError } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { BridgeError } from '@almighty-shogun/webkit-native-bridge'

type ValidationError = BridgeError<'VALIDATION_ERROR', { field: string }>;
```

<FrontmatterDocs/>

## Type signature

```ts
type BridgeError<TCode extends string = string, TDetails = unknown> = {
    type: 'native' | 'transport';
    code: TCode;
    message: string | null;
    details: TDetails | null;
};
```
