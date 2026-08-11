import type { BridgeError, ResolvedBridgeError } from '../types';

export default function <TCode extends string, TDetails>(error: BridgeError<TCode, TDetails>): ResolvedBridgeError {
    return {
        type: error.type,
        code: error.code,
        message: error.message ?? 'Unknown bridge error.',
        details: error.details
    };
}
