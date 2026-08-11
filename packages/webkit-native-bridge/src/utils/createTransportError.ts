import type { Nullable, NullableOrUndefinable } from '@almighty-shogun/utils';
import type { BridgeError, NativeTransportErrorCode, NativeTransportErrorDetails } from '../types';

export default function <TCode extends string = NativeTransportErrorCode, TDetails = NativeTransportErrorDetails>(
    code: TCode,
    message: Nullable<string>,
    details?: NullableOrUndefinable<TDetails>
): BridgeError<TCode, TDetails> {
    return {
        type: 'transport',
        code,
        message,
        details: details ?? null
    };
}
