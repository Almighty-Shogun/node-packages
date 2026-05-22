---
outline: deep

params:
    - name: error
      description: Error containing details.
      type: BridgeError

returns: The error details cast to `TExpectedDetails`, or `null` when the bridge error did not include details.
---

# getErrorDetailsAs

Casts bridge error details to the expected details type. Use it after checking the error code or error type when native code returns structured failure information.

## Importing

```ts
import { getErrorDetailsAs } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import { getErrorDetailsAs } from '@almighty-shogun/webkit-native-bridge'

type ValidationDetails = { field: string }
const details = getErrorDetailsAs<ValidationDetails>(response.error)
```

<FrontmatterDocs/>

## Type signature

```ts
declare function getErrorDetailsAs<TExpectedDetails>(
    error: BridgeError
): TExpectedDetails | null;
```
