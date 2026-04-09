import type { BridgeError, NativeTransportErrorCode, NativeTransportErrorDetails } from '../types'

export function createTransportError<TCode extends string = NativeTransportErrorCode, TDetails = NativeTransportErrorDetails>(
    code: TCode,
    message: string | null,
    details?: TDetails | null
): BridgeError<TCode, TDetails> {
    return {
        type: "transport",
        code,
        message,
        details: details ?? null,
    };
}

export function createNativeError<TCode extends string = string, TDetails = unknown>(
    code: TCode,
    message: string | null,
    details?: TDetails | null
): BridgeError<TCode, TDetails> {
    return {
        type: "native",
        code,
        message,
        details: details ?? null,
    };
}
