import type { BridgeError } from '../types'

export function isTransportError<TCode extends string, TDetails>(
    error: BridgeError<TCode, TDetails>
): error is BridgeError<TCode, TDetails> & { type: "transport" } {
    return error.type === "transport";
}

export function isNativeError<TCode extends string, TDetails>(
    error: BridgeError<TCode, TDetails>
): error is BridgeError<TCode, TDetails> & { type: "native" } {
    return error.type === "native";
}

export function getErrorDetailsAs<TExpectedDetails>(error: BridgeError): TExpectedDetails | null {
    return error.details as TExpectedDetails | null;
}
