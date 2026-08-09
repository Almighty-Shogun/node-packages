import type { Undefinable } from './types';

export default function (element?: Undefinable<HTMLElement>, options?: Undefinable<ScrollToOptions>): void {
    const target = element ?? window;

    options ??= { top: 0, behavior: 'smooth' };

    target.scrollTo(options);
}
