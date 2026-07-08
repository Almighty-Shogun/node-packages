export type Language = {
    name: string;
    code: string;
    flag: { plain: string; rounded: string; };
};

export type LanguageCode = keyof typeof languagesMap;
export type LocalizationCountries = Record<LanguageCode, Language>;

const languagesMap: Record<string, Language> = {
    en: {
        name: 'English',
        code: 'en',
        flag: {
            plain: 'images/country-flags/flag-united-kingdom',
            rounded: 'images/country-flags/rounded/flag-united-kingdom'
        }
    },
    nl: {
        name: 'Dutch',
        code: 'nl',
        flag: {
            plain: 'images/country-flags/flag-netherlands',
            rounded: 'images/country-flags/rounded/flag-netherlands'
        }
    },
    fr: {
        name: 'French',
        code: 'fr',
        flag: {
            plain: 'images/country-flags/flag-france',
            rounded: 'images/country-flags/rounded/flag-france'
        }
    },
    de: {
        name: 'German',
        code: 'de',
        flag: {
            plain: 'images/country-flags/flag-germany',
            rounded: 'images/country-flags/rounded/flag-germany'
        }
    },
    pl: {
        name: 'Polish',
        code: 'pl',
        flag: {
            plain: 'images/country-flags/flag-poland',
            rounded: 'images/country-flags/rounded/flag-poland'
        }
    }
};

export const languages: LocalizationCountries = languagesMap as LocalizationCountries;

export function getLanguage(code: LanguageCode): Language | null {
    return languages[code] ?? null;
}

export function getLanguages(): Language[] {
    return Object.values(languages);
}
