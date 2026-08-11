import type { BridgeError } from '../types';
import type { Nullable, NullableOrUndefinable } from '@almighty-shogun/utils';

export default function <TCode extends string = string, TDetails = unknown>(
    code: TCode,
    message: Nullable<string>,
    details?: NullableOrUndefinable<TDetails>
): BridgeError<TCode, TDetails> {
    return {
        type: 'native',
        code,
        message,
        details: details ?? null
    };
}
