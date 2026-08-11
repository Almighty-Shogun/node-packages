import { watch, type Ref } from 'vue';
import useLocalStorage from './useLocalStorage';
import { setWebsiteLocale } from '@almighty-shogun/utils';

export default function (key: string = 'application-locale'): UseWebsiteLocale {
    const locale = useLocalStorage(key, 'en');

    function setLocale(newLocale: string): void {
        locale.value = newLocale;
    }

    if (typeof document !== 'undefined') {
        watch(() => locale.value, (newLocale: string) => setWebsiteLocale(newLocale), { immediate: true });
    }

    return {
        locale,
        setLocale
    };
};

type UseWebsiteLocale = {
    readonly locale: Ref<string>;

    setLocale(newLocale: string): void;
};
