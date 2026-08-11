import type { NativeBridgeWindow } from '../types';
import type { Undefinable } from '@almighty-shogun/utils';

export default function (): Undefinable<NativeBridgeWindow> {
    return typeof window === 'undefined' ? undefined : window as NativeBridgeWindow;
}
