import type { Undefinable } from './types';
import getCorrectLocale from './internal/getCorrectLocale';

export default function (locale?: Undefinable<string>): void {
    document.documentElement.setAttribute('lang', getCorrectLocale(locale));
}
