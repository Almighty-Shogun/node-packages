export type BridgeSuccess<T> = {
    ok: true;
    message: string | null;
    data: T;
};

export type BridgeFailure<E = unknown> = {
    ok: false;
    message: string | null;
    error: E;
};

export type BridgeResponse<T, E = unknown> = BridgeSuccess<T> | BridgeFailure<E>;

export type NativeTransportError = {
    type: "timeout" | "unavailable" | "disposed" | "unknown";
};

export type NativeBridgeMessageHandler = {
    postMessage: (message: string) => void
};

export type NativeBridgeRequestMap = Record<string, {
    body: unknown
    response: unknown
}>;

export type NativeRequestBody<TRequests extends NativeBridgeRequestMap, TMethod extends keyof TRequests> =
    TRequests[TMethod]['body'];

export type NativeResponseBody<TRequests extends NativeBridgeRequestMap, TMethod extends keyof TRequests> =
    TRequests[TMethod]['response'];

export type NativeMethodsWithoutBody<TRequests extends NativeBridgeRequestMap> = {
    [TMethod in keyof TRequests]: [NativeRequestBody<TRequests, TMethod>] extends [void]
        ? TMethod : [NativeRequestBody<TRequests, TMethod>] extends [undefined] ? TMethod : never
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
    webkit?: {
        messageHandlers?: Record<string, NativeBridgeMessageHandler | undefined>;
    }
};

export type NativeRequestOptions = {
    timeout?: number | null;
};

export type NativeBridgeOptions = {
    eventName?: string;
    handlerName?: string;
    requestTimeout?: number | null;
    window?: NativeBridgeWindow;
};

export type NativeBridgePendingRequest = {
    method: string;
    resolve: (value: BridgeResponse<unknown, unknown>) => void;
    timeoutId: ReturnType<typeof setTimeout>|null;
};

export type NativeBridge<TRequests extends NativeBridgeRequestMap, TCommands extends string = never> = {
    call: (method: TCommands) => void;
    dispose: () => void;
    handleResponse: (detail: NativeResponseEventDetail) => void;
    isAvailable: () => boolean;
    postMessage: (message: string) => void;
    request: {
        <TMethod extends NativeMethodsWithoutBody<TRequests>, TError = NativeTransportError>(
            method: TMethod,
            body?: undefined,
            options?: NativeRequestOptions
        ): Promise<BridgeResponse<NativeResponseBody<TRequests, TMethod>, TError>>;
        <TMethod extends NativeMethodsWithBody<TRequests>, TError = NativeTransportError>(
            method: TMethod,
            body: NativeRequestBody<TRequests, TMethod>,
            options?: NativeRequestOptions
        ): Promise<BridgeResponse<NativeResponseBody<TRequests, TMethod>, TError>>;
    }
}
