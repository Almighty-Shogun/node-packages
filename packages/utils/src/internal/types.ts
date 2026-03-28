export type TranslateExists = (key: string) => boolean;
export type Translate = (key: string, params?: Record<string, unknown> | (string | number)[]) => string;

export type Route = {
    name: string|symbol|undefined;
};

export type I18n = {
    t: Translate;
    $t: Translate;
    te: TranslateExists;
    $te: TranslateExists;
};
