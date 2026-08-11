---
outline: deep
---

# Types

Shared TypeScript types exported by `@almighty-shogun/webkit-native-bridge`.

Some signatures reuse utility types from [`@almighty-shogun/utils`](../utils/types): [`Nullable`](../utils/types#nullable), [`NullableOrUndefinable`](../utils/types#nullableorundefinable), and [`Undefinable`](../utils/types#undefinable).

## BridgeSuccess

Successful native bridge response. It carries the typed response data and keeps `message` nullable because native code may omit a human-readable message for successful responses.

```ts
type BridgeSuccess<T> = {
    ok: true;
    message: Nullable<string>;
    data: T;
};
```

## BridgeError

Error payload returned by native code or produced by the JavaScript transport layer. The `type` field distinguishes native application errors from transport failures such as timeouts or unavailable handlers.

```ts
type BridgeError<TCode extends string = string, TDetails = unknown> = {
    type: 'native' | 'transport';
    code: TCode;
    message: Nullable<string>;
    details: Nullable<TDetails>;
};
```

## BridgeFailure

Failed native bridge response. It keeps the top-level nullable `message` from the raw response and includes the structured [`BridgeError`](./types#bridgeerror) for code, type, and details handling.

```ts
type BridgeFailure<TCode extends string = string, TDetails = unknown> = {
    ok: false;
    message: Nullable<string>;
    error: BridgeError<TCode, TDetails>;
};
```

## BridgeResponse

Discriminated union returned by [`NativeBridge.request()`](./types#nativebridge). Branch on `response.ok` to safely access either typed data or typed error details.

```ts
type BridgeResponse<
    TData,
    TCode extends string = string,
    TDetails = unknown
> = BridgeSuccess<TData> | BridgeFailure<TCode, TDetails>;
```

## ResolvedBridgeError

Normalized error shape returned by [`mapBridgeError()`](./functions/mapBridgeError) and used by failed [`NormalizedBridgeResponse`](./types#normalizedbridgeresponse) values. Unlike [`BridgeError`](./types#bridgeerror), the message is always a string.

```ts
type ResolvedBridgeError = {
    type: 'native' | 'transport';
    code: string;
    message: string;
    details: unknown;
};
```

## NormalizedBridgeResponse

Response union returned by [`normalizeBridgeResponse()`](./functions/normalizeBridgeResponse). Success responses keep the original success shape, while failures expose a [`ResolvedBridgeError`](./types#resolvedbridgeerror) with a non-null message.

```ts
type NormalizedBridgeResponse<TData> = BridgeSuccess<TData> | {
    ok: false;
    error: ResolvedBridgeError;
};
```

## NativeTransportErrorCode

Transport error code union produced by the JavaScript bridge runtime for failures that happen before or outside native application handling.

```ts
type NativeTransportErrorCode =
    | 'TIMEOUT'
    | 'UNAVAILABLE'
    | 'DISPOSED'
    | 'UNKNOWN';
```

## NativeTransportErrorDetails

Details attached to transport errors. The `cause` field can preserve the original thrown error or runtime value that triggered the transport failure.

```ts
type NativeTransportErrorDetails = {
    cause?: unknown;
};
```

## NativeBridgeRequestMap

Contract map used to type native request method names, request bodies, response bodies, and optional native error metadata.

```ts
type NativeBridgeRequestMap = Record<string, {
    body: unknown;
    response: unknown;
    errorCode?: Undefinable<string>;
    errorDetails?: unknown;
}>;
```

## NativeRequestResult

The full response type for one request method, assembled from the contract's response body and the two error unions above. [`NativeBridge.request()`](./types#nativebridge) resolves to this, so it is what you branch on with `response.ok`.

```ts
type NativeRequestResult<
    TRequests extends NativeBridgeRequestMap,
    TMethod extends keyof TRequests
> = BridgeResponse<
    NativeResponseBody<TRequests, TMethod>,
    BridgeErrorCode<TRequests, TMethod>,
    BridgeErrorDetails<TRequests, TMethod>
>;
```

## NativeResponseEventDetail

DOM event detail shape expected by [`NativeBridge.handleResponse()`](./types#nativebridge) and the automatic response listener. Native code dispatches this detail back to JavaScript to resolve a pending request.

```ts
type NativeResponseEventDetail = {
    requestId: string;
    ok: boolean;
    payload: unknown;
    error: unknown;
};
```

## NativeBridgeWindow

Window-like object used by the bridge runtime. Pass this through [`NativeBridgeOptions.window`](./types#nativebridgeoptions) for tests, alternate runtimes, or explicit WebKit window injection.

```ts
type NativeBridgeWindow = Window & {
    webkit?: Undefinable<{
        messageHandlers?: Undefinable<Record<
            string,
            Undefinable<NativeBridgeMessageHandler>
        >>;
    }>
};
```

## NativeRequestOptions

Per-request options accepted by [`NativeBridge.request()`](./types#nativebridge). Use `timeout` to override the bridge default for one request, or `null` to disable that request timeout.

```ts
type NativeRequestOptions = {
    timeout?: NullableOrUndefinable<number>;
};
```

## NativeBridgeOptions

Configuration accepted by [`createNativeBridge()`](./functions/createNativeBridge). It controls the response event name, WebKit handler name, default request timeout, and window-like runtime object.

```ts
type NativeBridgeOptions = {
    eventName?: Undefinable<string>;
    handlerName?: Undefinable<string>;
    requestTimeout?: NullableOrUndefinable<number>;
    window?: Undefinable<NativeBridgeWindow>;
};
```

## NativeBridge

Runtime bridge object returned by [`createNativeBridge()`](./functions/createNativeBridge). It exposes low-level posting, typed request/response calls, fire-and-forget commands, availability checks, manual response handling, and disposal.

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
            options?: Undefinable<NativeRequestOptions>
        ): Promise<NativeRequestResult<TRequests, TMethod>>;
        <TMethod extends NativeMethodsWithBody<TRequests>>(
            method: TMethod,
            body: NativeRequestBody<TRequests, TMethod>,
            options?: Undefinable<NativeRequestOptions>
        ): Promise<NativeRequestResult<TRequests, TMethod>>;
    };
};
```
