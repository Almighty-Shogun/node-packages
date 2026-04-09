import type { BridgeError, BridgeResponse, NormalizedBridgeResponse, ResolvedBridgeError } from './types'

export function mapBridgeError<TCode extends string, TDetails>(error: BridgeError<TCode, TDetails>): ResolvedBridgeError {
    return {
        type: error.type,
        code: error.code,
        message: error.message ?? 'Unknown bridge error.',
        details: error.details,
    };
}

export function normalizeBridgeResponse<TData, TCode extends string, TDetails>(response: BridgeResponse<TData, TCode, TDetails>): NormalizedBridgeResponse<TData> {
    if (response.ok) {
        return {
            ok: true,
            message: response.message,
            data: response.data,
        };
    }

    return {
        ok: false,
        error: mapBridgeError(response.error),
    };
}
