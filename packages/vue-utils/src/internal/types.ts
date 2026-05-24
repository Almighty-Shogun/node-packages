export type TranslationParams = Record<string, unknown> | (string | number)[];

export type TranslateExists = (key: string) => boolean;
export type Translate = (key: string, params?: TranslationParams) => string;

export type I18n = {
    t?: Translate;
    $t?: Translate;
    te?: TranslateExists;
    $te?: TranslateExists;
};
