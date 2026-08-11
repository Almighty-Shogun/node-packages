import type { BridgeError } from '../types';
import createNativeError from './createNativeError';
import type { Nullable } from '@almighty-shogun/utils';
import { DEFAULT_NATIVE_ERROR_CODE } from '../constants';

export default function <TCode extends string = string, TDetails = unknown>(
    error: unknown,
    fallbackMessage: Nullable<string>
): BridgeError<TCode, TDetails> {
    if (typeof error === 'object' && error !== null) {
        const errorObject = error as {
            code?: unknown;
            message?: unknown;
            details?: unknown;
            error?: unknown;
        };

        return createNativeError(
            typeof errorObject.code === 'string' ? errorObject.code as TCode : DEFAULT_NATIVE_ERROR_CODE as TCode,
            typeof errorObject.message === 'string' ? errorObject.message : fallbackMessage,
            (errorObject.details ?? errorObject.error ?? null) as Nullable<TDetails>
        );
    }

    if (typeof error === 'string') {
        return createNativeError<TCode, TDetails>(DEFAULT_NATIVE_ERROR_CODE as TCode, error);
    }

    return createNativeError<TCode, TDetails>(
        DEFAULT_NATIVE_ERROR_CODE as TCode,
        fallbackMessage,
        (error ?? null) as Nullable<TDetails>
    );
}
