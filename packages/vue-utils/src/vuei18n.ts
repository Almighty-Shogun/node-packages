import type { I18n, Translate, TranslateExists, TranslationParams } from './internal/types'

type I18nMethod = 't' | 'te';

let i18nGlobal: I18n|null = null;

export function registerI18n(i18n: I18n|null): void {
    i18nGlobal = i18n;
}

export function clearRegisteredI18n(): void {
    i18nGlobal = null;
}

export function translate(key: string, params?: TranslationParams): string {
    const method = getMethod('t', ((value: string) => value) as Translate);

    return params === undefined
        ? method(key)
        : method(key, params);
}

export function translationExists(key: string, subKeys: string[] = []): boolean {
    const method = getMethod('te', (() => false) as TranslateExists);

    return subKeys.length === 0
        ? method(key)
        : subKeys.every(subKey => method(`${key}.${subKey}`));
}

function getMethod<T extends Translate | TranslateExists>(method: I18nMethod, fallback: T): T {
    if (!i18nGlobal) {
        return fallback;
    }

    const legacyMethod = method === 't' ? '$t' : '$te';
    const resolvedMethod = i18nGlobal[method] ?? i18nGlobal[legacyMethod];

    return (resolvedMethod as T | undefined) ?? fallback;
}
