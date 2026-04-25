import { watch, type Ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { setWebsiteLocale } from '@almighty-shogun/utils'

export default function (): UseWebsiteLocale {
    const locale = useLocalStorage("application-locale", "en");

    function setLocale(newLocale: string): void {
        locale.value = newLocale;
    }

    watch(() => locale.value, (newLocale) => setWebsiteLocale(newLocale));

    return {
        locale,
        setLocale
    };
};

type UseWebsiteLocale = {
    readonly locale: Ref<string>;

    setLocale(newLocale: string): void;
};
