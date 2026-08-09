import type { Nullable, NullableOrUndefinable, Undefinable } from '@almighty-shogun/utils';
import type { BridgeResponse, NativeTransportErrorCode, NativeTransportErrorDetails } from './bridgeResponse';

export type NativeBridgeMessageHandler = {
    postMessage: (message: string) => void
};

export type NativeBridgeRequestMap = Record<string, {
    body: unknown
    response: unknown
    errorCode?: Undefinable<string>
    errorDetails?: unknown
}>;

export type NativeRequestBody<TRequests extends NativeBridgeRequestMap, TMethod extends keyof TRequests> =
    TRequests[TMethod]['body'];

export type NativeResponseBody<TRequests extends NativeBridgeRequestMap, TMethod extends keyof TRequests> =
    TRequests[TMethod]['response'];

export type NativeErrorCode<TRequests extends NativeBridgeRequestMap, TMethod extends keyof TRequests> =
    TRequests[TMethod] extends { errorCode?: Undefinable<infer TErrorCode extends string> } ? TErrorCode : string;

export type NativeErrorDetails<TRequests extends NativeBridgeRequestMap, TMethod extends keyof TRequests> =
    TRequests[TMethod] extends { errorDetails?: Undefinable<infer TErrorDetails> } ? TErrorDetails : unknown;

export type BridgeErrorCode<TRequests extends NativeBridgeRequestMap, TMethod extends keyof TRequests> =
    NativeErrorCode<TRequests, TMethod> | NativeTransportErrorCode;

export type BridgeErrorDetails<TRequests extends NativeBridgeRequestMap, TMethod extends keyof TRequests> =
    NativeErrorDetails<TRequests, TMethod> | NativeTransportErrorDetails;

export type NativeRequestResult<TRequests extends NativeBridgeRequestMap, TMethod extends keyof TRequests> = BridgeResponse<
    NativeResponseBody<TRequests, TMethod>,
    BridgeErrorCode<TRequests, TMethod>,
    BridgeErrorDetails<TRequests, TMethod>
>;

export type NativeMethodsWithoutBody<TRequests extends NativeBridgeRequestMap> = {
    [TMethod in keyof TRequests]:
    [NativeRequestBody<TRequests, TMethod>] extends [void]
        ? TMethod
        : [NativeRequestBody<TRequests, TMethod>] extends [undefined]
            ? TMethod : never
}[keyof TRequests];

export type NativeMethodsWithBody<TRequests extends NativeBridgeRequestMap> =
    Exclude<keyof TRequests, NativeMethodsWithoutBody<TRequests>>;

export type NativeResponseEventDetail = {
    requestId: string;
    ok: boolean;
    payload: unknown;
    error: unknown;
};

export type NativeBridgeWindow = Window & {
    webkit?: Undefinable<{
        messageHandlers?: Undefinable<Record<string, Undefinable<NativeBridgeMessageHandler>>>;
    }>
};

export type NativeRequestOptions = {
    timeout?: NullableOrUndefinable<number>;
};

export type NativeBridgeOptions = {
    eventName?: Undefinable<string>;
    handlerName?: Undefinable<string>;
    requestTimeout?: NullableOrUndefinable<number>;
    window?: Undefinable<NativeBridgeWindow>;
};

export type NativeBridgePendingRequest = {
    method: string;
    resolve: (value: BridgeResponse<unknown>) => void;
    timeoutId: Nullable<ReturnType<typeof setTimeout>>;
};

export type NativeBridge<TRequests extends NativeBridgeRequestMap, TCommands extends string = never> = {
    call: (method: TCommands) => void;
    dispose: () => void;
    handleResponse: (detail: NativeResponseEventDetail) => void;
    isAvailable: () => boolean;
    postMessage: (message: string) => void;
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
    }
}
