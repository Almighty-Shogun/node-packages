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

# BridgeFailure

Represents a failed bridge response. The `ok: false` discriminator lets TypeScript narrow the response and expose the structured `error` object.

## Importing

```ts
import type { BridgeFailure } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { BridgeFailure } from '@almighty-shogun/webkit-native-bridge'

const failure: BridgeFailure<'TIMEOUT'> = {
    ok: false,
    message: 'Timed out',
    error: { type: 'transport', code: 'TIMEOUT', message: 'Timed out', details: null }
}
```

<FrontmatterDocs/>

## Type signature

```ts
type BridgeFailure<
    TCode extends string = string,
    TDetails = unknown
> = {
    ok: false;
    message: string | null;
    error: BridgeError<TCode, TDetails>;
};
```
