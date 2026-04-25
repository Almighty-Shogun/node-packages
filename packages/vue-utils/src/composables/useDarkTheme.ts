import { watch, type Ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { setDarkTheme } from '@almighty-shogun/utils'

export default function (): UseDarkTheme {
    const darkMode = useLocalStorage("application-theme", false);

    function toggle(): void {
        darkMode.value = !darkMode.value;
    }

    watch(() => darkMode.value, (newTheme) => setDarkTheme(newTheme));

    return {
        darkMode,
        toggle
    };
};

type UseDarkTheme = {
    readonly darkMode: Ref<boolean>;

    toggle(): void;
};
