import mapBridgeError from './mapBridgeError';
import type { BridgeResponse, NormalizedBridgeResponse } from '../types';

export default function <TData, TCode extends string, TDetails>(
    response: BridgeResponse<TData, TCode, TDetails>
): NormalizedBridgeResponse<TData> {
    if (response.ok) {
        return {
            ok: true,
            message: response.message,
            data: response.data
        };
    }

    return {
        ok: false,
        error: mapBridgeError(response.error)
    };
}
