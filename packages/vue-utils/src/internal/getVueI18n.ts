import { getCurrentInstance } from 'vue'
import type { Route, I18n } from './types'

type VueInstance = {
    i18n: I18n|null;
};

export default function (): VueInstance {
    const instance = getCurrentInstance();
    const globalProperties = instance?.appContext.config.globalProperties;

    return {
        i18n: globalProperties?.$i18n ?? null,
    };
}
