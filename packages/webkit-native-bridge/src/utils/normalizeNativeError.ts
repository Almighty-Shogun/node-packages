import type { BridgeError } from '../types'
import { createNativeError } from './errorFactories'
import { DEFAULT_NATIVE_ERROR_CODE } from '../constants'

export function normalizeNativeError<TCode extends string = string, TDetails = unknown>(
    error: unknown,
    fallbackMessage: string | null
): BridgeError<TCode, TDetails> {
    if (typeof error === "object" && error !== null) {
        const errorObject = error as {
            code?: unknown;
            message?: unknown;
            details?: unknown;
            error?: unknown;
        };

        return createNativeError(
            typeof errorObject.code === "string" ? errorObject.code as TCode : DEFAULT_NATIVE_ERROR_CODE as TCode,
            typeof errorObject.message === "string" ? errorObject.message : fallbackMessage,
            (errorObject.details ?? errorObject.error ?? null) as TDetails | null,
        );
    }

    if (typeof error === "string") {
        return createNativeError<TCode, TDetails>(DEFAULT_NATIVE_ERROR_CODE as TCode, error);
    }

    return createNativeError<TCode, TDetails>(DEFAULT_NATIVE_ERROR_CODE as TCode, fallbackMessage, (error ?? null) as TDetails | null);
}
