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

export type NativeResponseEventDetail<TPayload = unknown> = {
    requestId: string;
    ok: boolean;
    payload?: TPayload;
    error?: string | null;
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
    reject: (reason?: unknown) => void;
    resolve: (value: unknown) => void;
    timeoutId: ReturnType<typeof setTimeout> | null;
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
            options?: NativeRequestOptions
        ): Promise<NativeResponseBody<TRequests, TMethod>>;
        <TMethod extends NativeMethodsWithBody<TRequests>>(
            method: TMethod,
            body: NativeRequestBody<TRequests, TMethod>,
            options?: NativeRequestOptions
        ): Promise<NativeResponseBody<TRequests, TMethod>>;
    }
}
