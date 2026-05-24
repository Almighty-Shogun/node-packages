---
outline: deep

params:
    - name: TData
      description: Success payload type.

    - name: TCode
      description: Error code union for failures. Defaults to `string`.

    - name: TDetails
      description: Optional structured error details. Defaults to `unknown`.

returns: A discriminated TypeScript union. It does not exist at runtime, but it describes the success and failure shapes returned by native bridge requests.
---

# BridgeResponse

Represents the complete result of a typed native bridge request. The union is discriminated by `ok`, so checking `response.ok` gives TypeScript the correct branch: success responses expose `data`, while failures expose `error`.

Use this type at API boundaries when you want to preserve the exact response shape returned by `bridge.request()`.

## Importing

```ts
import type { BridgeResponse } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { BridgeResponse } from '@almighty-shogun/webkit-native-bridge'

type UserResponse = BridgeResponse<;
    { id: string; name: string },
    'USER_NOT_FOUND',
    { id: string }
>

function renderUserResponse(response: UserResponse) {
    if (response.ok) {
        return response.data.name;
    }

    if (response.error.code === 'USER_NOT_FOUND') {
        return 'User ' + (response.error.details?.id ?? 'unknown') + ' was not found';
    }

    return response.message ?? 'Unknown error';
}
```

<FrontmatterDocs/>

## Type signature

```ts
type BridgeResponse<
    TData,
    TCode extends string = string,
    TDetails = unknown
> =
    | BridgeSuccess<TData>
    | BridgeFailure<TCode, TDetails>;
```
