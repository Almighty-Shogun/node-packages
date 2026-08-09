import type { BridgeError } from '../types';
import type { Nullable } from '@almighty-shogun/utils';

export function isTransportError<TCode extends string, TDetails>(
    error: BridgeError<TCode, TDetails>
): error is BridgeError<TCode, TDetails> & { type: 'transport' } {
    return error.type === 'transport';
}

export function isNativeError<TCode extends string, TDetails>(
    error: BridgeError<TCode, TDetails>
): error is BridgeError<TCode, TDetails> & { type: 'native' } {
    return error.type === 'native';
}

export function getErrorDetailsAs<TExpectedDetails>(error: BridgeError): Nullable<TExpectedDetails> {
    return error.details as Nullable<TExpectedDetails>;
}
