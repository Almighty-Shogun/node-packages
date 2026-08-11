import type { BridgeError } from '../types';
import type { Nullable } from '@almighty-shogun/utils';

export default function <TExpectedDetails>(error: BridgeError): Nullable<TExpectedDetails> {
    return error.details as Nullable<TExpectedDetails>;
}
