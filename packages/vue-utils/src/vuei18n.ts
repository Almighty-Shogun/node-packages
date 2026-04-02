import getVueInstance from './internal/getVueInstance'
import type { Translate, TranslateExists } from './internal/types'

type I18nGlobal = {
    t: Translate;
    te: TranslateExists;
}

let i18nGlobal: I18nGlobal|null = null;

export function setGlobalI18n(i18n: I18nGlobal): void {
    i18nGlobal = i18n;
}

export function translate(key: string, params?: (Record<string, unknown>|(string|number)[])): string {
    const { i18n } = getVueInstance();

    const base = i18n?.$t ?? i18n?.t;
    const fallback = i18nGlobal?.t ?? ((key) => key);

    const method = base ?? fallback;

    return method(key, params ?? {});
}

export function translationExists(key: string, subKeys: string[] = []): boolean {
    const { i18n } = getVueInstance();

    const base = i18n?.$te ?? i18n?.te;
    const fallback = i18nGlobal?.te ?? (() => false);

    const method = base ?? fallback;

    return subKeys.length === 0
        ? method(key)
        : subKeys.every(subKey => method(`${key}.${subKey}`));
}
