import type { ComponentPublicInstance } from 'vue';
import type { HTMLTarget, Undefinable } from '@almighty-shogun/utils';

export type ComponentElement = HTMLElement | ComponentPublicInstance;
export type ComponentTarget = HTMLTarget | ComponentPublicInstance;

export type TranslationParams = Record<string, unknown> | (string | number)[];

export type TranslateExists = (key: string) => boolean;
export type Translate = (key: string, params?: Undefinable<TranslationParams>) => string;

export type I18n = {
    t?: Undefinable<Translate>;
    $t?: Undefinable<Translate>;
    te?: Undefinable<TranslateExists>;
    $te?: Undefinable<TranslateExists>;
};

export type ParsedHotKey = {
    key: string;
    ctrl: boolean;
    alt: boolean;
    shift: boolean;
    meta: boolean;
    mod: boolean;
};
