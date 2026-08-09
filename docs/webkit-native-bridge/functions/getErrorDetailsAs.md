---
outline: deep

params:
    - name: error
      description: Error containing details.
      type: BridgeError

returns: The error details cast to `Nullable<TExpectedDetails>`.
---

# getErrorDetailsAs

Casts bridge error details to the expected details type. Use it after checking the error code or error type when native code returns structured failure information.

## Importing

```ts
import { getErrorDetailsAs } from '@almighty-shogun/webkit-native-bridge';
```

## Usage

```ts
import {
    createNativeBridge,
    getErrorDetailsAs
} from '@almighty-shogun/webkit-native-bridge';

type ValidationDetails = { field: string };

type Requests = {
    saveUser: {
        body: {
            name: string
        };
        response: void
    }
}

const bridge = createNativeBridge<Requests>();
const response = await bridge.request('saveUser', { name: '' });

if (!response.ok) {
    const details = getErrorDetailsAs<ValidationDetails>(response.error);

    console.warn(details?.field);
}
```

<FrontmatterDocs/>

## Uses

- [Nullable](../../utils/types#nullable)

## Type signature

```ts
declare function getErrorDetailsAs<TExpectedDetails>(
    error: BridgeError
): Nullable<TExpectedDetails>;
```
