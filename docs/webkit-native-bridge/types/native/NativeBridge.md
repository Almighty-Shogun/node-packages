---
outline: deep

params:
    - name: TRequests
      type: NativeBridgeRequestMap
      description: Request map used to type request method names, request bodies, responses, and native errors.

    - name: TCommands
      type: string
      description: String union of fire-and-forget command names.
      defaultValue: 'never'

returns: A TypeScript type for native bridge APIs. It is erased at runtime and is used only by TypeScript to describe the shape of values passed to or returned from the package APIs.
---

# NativeBridge

Runtime bridge object returned by `createNativeBridge`. It exposes low-level posting, typed requests, command calls, availability checks, manual response handling, and disposal.

## Importing

```ts
import type { NativeBridge } from '@almighty-shogun/webkit-native-bridge'
```

## Usage

```ts
import type { NativeBridge } from '@almighty-shogun/webkit-native-bridge'

type Requests = {
    getUser: { body: { id: string }; response: { name: string } }
}

type AppBridge = NativeBridge<Requests, 'close'>;
```

<FrontmatterDocs/>

## Type signature

```ts
type NativeBridge<
    TRequests extends NativeBridgeRequestMap,
    TCommands extends string = never
> = {
    call(method: TCommands): void;
    dispose(): void;
    handleResponse(detail: NativeResponseEventDetail): void;
    isAvailable(): boolean;
    postMessage(message: string): void;
    request: {
        <TMethod extends NativeMethodsWithoutBody<TRequests>>(
            method: TMethod,
            body?: undefined,
            options?: NativeRequestOptions
        ): Promise<
            BridgeResponse<NativeResponseBody<TRequests, TMethod>>
        >;

        <TMethod extends NativeMethodsWithBody<TRequests>>(
            method: TMethod,
            body: NativeRequestBody<TRequests, TMethod>,
            options?: NativeRequestOptions
        ): Promise<
            BridgeResponse<NativeResponseBody<TRequests, TMethod>>
        >;
    };
};
```
