import type { I18n } from './types';
import { getCurrentInstance } from 'vue';
import type { Undefinable, NullableOrUndefinable } from '@almighty-shogun/utils';

export default function (): NullableOrUndefinable<I18n> {
    const instance = getCurrentInstance();
    const globalProperties = instance?.appContext.config.globalProperties;

    return (globalProperties?.$i18n as Undefinable<I18n>) ?? null;
}
