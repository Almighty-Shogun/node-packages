---
outline: deep
---

# Types

Shared TypeScript types exported by `@almighty-shogun/webkit-native-bridge`.

## BridgeSuccess

Successful native bridge response. It carries the typed response data and keeps `message` nullable because native code may omit a human-readable message for successful responses.

```ts
type BridgeSuccess<T> = {
    ok: true;
    message: string | null;
    data: T;
};
```

## BridgeError

Error payload returned by native code or produced by the JavaScript transport layer. The `type` field distinguishes native application errors from transport failures such as timeouts or unavailable handlers.

```ts
type BridgeError<TCode extends string = string, TDetails = unknown> = {
    type: 'native' | 'transport';
    code: TCode;
    message: string | null;
    details: TDetails | null;
};
```

## BridgeFailure

Failed native bridge response. It keeps the top-level nullable `message` from the raw response and includes the structured `BridgeError` for code, type, and details handling.

```ts
type BridgeFailure<TCode extends string = string, TDetails = unknown> = {
    ok: false;
    message: string | null;
    error: BridgeError<TCode, TDetails>;
};
```

## BridgeResponse

Discriminated union returned by `NativeBridge.request()`. Branch on `response.ok` to safely access either typed data or typed error details.

```ts
type BridgeResponse<TData, TCode extends string = string, TDetails = unknown> =
    BridgeSuccess<TData> | BridgeFailure<TCode, TDetails>;
```

## ResolvedBridgeError

Normalized error shape returned by `mapBridgeError()` and used by failed `NormalizedBridgeResponse` values. Unlike `BridgeError`, the message is always a string.

```ts
type ResolvedBridgeError = {
    type: 'native' | 'transport';
    code: string;
    message: string;
    details: unknown;
};
```

## NormalizedBridgeResponse

Response union returned by `normalizeBridgeResponse()`. Success responses keep the original success shape, while failures expose a `ResolvedBridgeError` with a non-null message.

```ts
type NormalizedBridgeResponse<TData> = BridgeSuccess<TData> | {
    ok: false;
    error: ResolvedBridgeError;
};
```

## NativeTransportErrorCode

Transport error code union produced by the JavaScript bridge runtime for failures that happen before or outside native application handling.

```ts
type NativeTransportErrorCode = 'TIMEOUT' | 'UNAVAILABLE' | 'DISPOSED' | 'UNKNOWN';
```

## NativeTransportErrorDetails

Details attached to transport errors. The `cause` field can preserve the original thrown error or runtime value that triggered the transport failure.

```ts
type NativeTransportErrorDetails = {
    cause?: unknown;
};
```

## NativeBridgeMessageHandler

WebKit message handler object looked up under `window.webkit.messageHandlers[handlerName]`. The bridge sends encoded string messages to native code through `postMessage()`.

```ts
type NativeBridgeMessageHandler = {
    postMessage(message: string): void;
};
```

## NativeBridgeRequestMap

Contract map used to type native request method names, request bodies, response bodies, and optional native error metadata.

```ts
type NativeBridgeRequestMap = Record<string, {
    body: unknown;
    response: unknown;
    errorCode?: string;
    errorDetails?: unknown;
}>;
```

## NativeRequestBody

Extracts the request body type for one method from a `NativeBridgeRequestMap`. It is used by `NativeBridge.request()` overloads to require bodies only for methods that define them.

```ts
type NativeRequestBody<
    TRequests extends NativeBridgeRequestMap,
    TMethod extends keyof TRequests
> = TRequests[TMethod]['body'];
```

## NativeResponseBody

Extracts the response payload type for one method from a `NativeBridgeRequestMap`.

```ts
type NativeResponseBody<
    TRequests extends NativeBridgeRequestMap,
    TMethod extends keyof TRequests
> = TRequests[TMethod]['response'];
```

## NativeErrorCode

Extracts the native error code union for one method. When the method contract does not provide an `errorCode`, the type falls back to `string`.

```ts
type NativeErrorCode<
    TRequests extends NativeBridgeRequestMap,
    TMethod extends keyof TRequests
> = TRequests[TMethod] extends { errorCode?: infer TErrorCode extends string }
    ? TErrorCode
    : string;
```

## NativeErrorDetails

Extracts the native error details type for one method. When the method contract does not provide `errorDetails`, the type falls back to `unknown`.

```ts
type NativeErrorDetails<
    TRequests extends NativeBridgeRequestMap,
    TMethod extends keyof TRequests
> = TRequests[TMethod] extends { errorDetails?: infer TErrorDetails }
    ? TErrorDetails
    : unknown;
```

## NativeMethodsWithoutBody

Builds a union of request method names whose body type is `void` or `undefined`. `NativeBridge.request()` uses it to make the body argument optional for those methods.

```ts
type NativeMethodsWithoutBody<TRequests extends NativeBridgeRequestMap> = {
    [TMethod in keyof TRequests]: [NativeRequestBody<TRequests, TMethod>] extends [void]
        ? TMethod : [NativeRequestBody<TRequests, TMethod>] extends [undefined] ? TMethod : never
}[keyof TRequests];
```

## NativeMethodsWithBody

Builds a union of request method names that require a body by excluding methods covered by `NativeMethodsWithoutBody`.

```ts
type NativeMethodsWithBody<TRequests extends NativeBridgeRequestMap> =
    Exclude<keyof TRequests, NativeMethodsWithoutBody<TRequests>>;
```

## NativeResponseEventDetail

DOM event detail shape expected by `NativeBridge.handleResponse()` and the automatic response listener. Native code dispatches this detail back to JavaScript to resolve a pending request.

```ts
type NativeResponseEventDetail = {
    requestId: string;
    ok: boolean;
    payload: unknown;
    error: unknown;
};
```

## NativeBridgeWindow

Window-like object used by the bridge runtime. Pass this through `NativeBridgeOptions.window` for tests, alternate runtimes, or explicit WebKit window injection.

```ts
type NativeBridgeWindow = Window & {
    webkit?: {
        messageHandlers?: Record<string, NativeBridgeMessageHandler | undefined>;
    }
};
```

## NativeRequestOptions

Per-request options accepted by `NativeBridge.request()`. Use `timeout` to override the bridge default for one request, or `null` to disable that request timeout.

```ts
type NativeRequestOptions = {
    timeout?: number | null;
};
```

## NativeBridgeOptions

Configuration accepted by `createNativeBridge()`. It controls the response event name, WebKit handler name, default request timeout, and window-like runtime object.

```ts
type NativeBridgeOptions = {
    eventName?: string;
    handlerName?: string;
    requestTimeout?: number | null;
    window?: NativeBridgeWindow;
};
```

## NativeBridgePendingRequest

Internal pending-request state stored while a native request is waiting for a response, timeout, or bridge disposal. It is exported for tests and adapters that need to model bridge internals.

```ts
type NativeBridgePendingRequest = {
    method: string;
    resolve(value: BridgeResponse<unknown>): void;
    timeoutId: ReturnType<typeof setTimeout> | null;
};
```

## NativeBridge

Runtime bridge object returned by `createNativeBridge()`. It exposes low-level posting, typed request/response calls, fire-and-forget commands, availability checks, manual response handling, and disposal.

```ts
type NativeBridge<TRequests extends NativeBridgeRequestMap, TCommands extends string = never> = {
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
        ): Promise<BridgeResponse<
            NativeResponseBody<TRequests, TMethod>,
            NativeErrorCode<TRequests, TMethod> | NativeTransportErrorCode,
            NativeErrorDetails<TRequests, TMethod> | NativeTransportErrorDetails
        >>;
        <TMethod extends NativeMethodsWithBody<TRequests>>(
            method: TMethod,
            body: NativeRequestBody<TRequests, TMethod>,
            options?: NativeRequestOptions
        ): Promise<BridgeResponse<
            NativeResponseBody<TRequests, TMethod>,
            NativeErrorCode<TRequests, TMethod> | NativeTransportErrorCode,
            NativeErrorDetails<TRequests, TMethod> | NativeTransportErrorDetails
        >>;
    };
};
```

