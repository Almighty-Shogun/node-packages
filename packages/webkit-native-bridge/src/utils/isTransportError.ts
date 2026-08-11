import type { BridgeError } from '../types';

export default function <TCode extends string, TDetails>(
    error: BridgeError<TCode, TDetails>
): error is BridgeError<TCode, TDetails> & { type: 'transport' } {
    return error.type === 'transport';
}
