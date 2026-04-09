export type BridgeSuccess<T> = {
    ok: true;
    message: string | null;
    data: T;
};

export type BridgeError<TCode extends string = string, TDetails = unknown> = {
    type: "native" | "transport";
    code: TCode;
    message: string | null;
    details: TDetails | null;
};

export type BridgeFailure<TCode extends string = string, TDetails = unknown> = {
    ok: false;
    message: string | null;
    error: BridgeError<TCode, TDetails>;
};

export type BridgeResponse<TData, TCode extends string = string, TDetails = unknown> =
    BridgeSuccess<TData> | BridgeFailure<TCode, TDetails>;

export type ResolvedBridgeError = {
    type: "native" | "transport";
    code: string;
    message: string;
    details: unknown;
};

export type NormalizedBridgeResponse<TData> = BridgeSuccess<TData> | {
    ok: false;
    error: ResolvedBridgeError;
};

export type NativeTransportErrorCode = "TIMEOUT" | "UNAVAILABLE" | "DISPOSED" | "UNKNOWN";

export type NativeTransportErrorDetails = {
    cause?: unknown;
};
