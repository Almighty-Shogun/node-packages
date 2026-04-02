import type { I18n } from './types'
import { getCurrentInstance } from 'vue'

export default function (): I18n|null {
    const instance = getCurrentInstance();
    const globalProperties = instance?.appContext.config.globalProperties;

    return (globalProperties?.$i18n as I18n | undefined) ?? null;
}
