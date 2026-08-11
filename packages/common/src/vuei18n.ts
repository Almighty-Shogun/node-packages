import type { Nullable, Undefinable } from '@almighty-shogun/utils';
import { getVueI18n, type I18n, type Translate, type TranslateExists, type TranslationParams } from './internal';

type I18nMethod = 't' | 'te';

let i18nGlobal: Nullable<I18n> = null;

function resolveI18n(): Nullable<I18n> {
    return i18nGlobal ?? getVueI18n() ?? null;
}

function getMethod<T extends Translate | TranslateExists>(method: I18nMethod, fallback: T): T {
    const i18n = resolveI18n();

    if (!i18n) {
        return fallback;
    }

    const legacyMethod = method === 't' ? '$t' : '$te';
    const resolvedMethod = i18n[method] ?? i18n[legacyMethod];

    return (resolvedMethod as Undefinable<T>) ?? fallback;
}

export function registerI18n(i18n: I18n): void {
    i18nGlobal = i18n;
}

export function clearRegisteredI18n(): void {
    i18nGlobal = null;
}

export function translate(key: string, params?: Undefinable<TranslationParams>): string {
    const method = getMethod('t', ((value: string) => value) as Translate);

    return params === undefined ? method(key) : method(key, params);
}

export function translationExists(key: string, subKeys: string[] = []): boolean {
    const method = getMethod('te', (() => false) as TranslateExists);

    return subKeys.length === 0
        ? method(key)
        : subKeys.every(subKey => method(`${key}.${subKey}`));
}
