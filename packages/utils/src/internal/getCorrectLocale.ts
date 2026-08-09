import type { Undefinable } from '../types';

export default function (locale?: Undefinable<string>): string {
    if (locale) {
        return locale;
    }

    if (typeof document !== 'undefined' && document.documentElement?.lang) {
        return document.documentElement.lang;
    }

    if (typeof navigator !== 'undefined' && navigator.language) {
        return navigator.language;
    }

    return 'en';
}
