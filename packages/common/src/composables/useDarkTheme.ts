import { watch, type Ref } from 'vue';
import useLocalStorage from './useLocalStorage';
import { setDarkTheme } from '@almighty-shogun/utils';

export default function (key: string = 'application-theme'): UseDarkTheme {
    const darkMode = useLocalStorage(key, false);

    function toggle(): void {
        darkMode.value = !darkMode.value;
    }

    if (typeof document !== 'undefined') {
        watch(() => darkMode.value, (newTheme: boolean) => setDarkTheme(newTheme), { immediate: true });
    }

    return {
        darkMode,
        toggle
    };
};

type UseDarkTheme = {
    readonly darkMode: Ref<boolean>;

    toggle(): void;
};
