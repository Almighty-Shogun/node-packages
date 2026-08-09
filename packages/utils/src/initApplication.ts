import disableZoom from './disableZoom';
import setDarkTheme from './setDarkTheme';
import type { Undefinable } from './types';
import setWebsiteLocale from './setWebsiteLocale';

type ApplicationConfig = {
    locale?: Undefinable<string>;
    isDarkTheme?: Undefinable<boolean>;
    isZoomDisabled?: Undefinable<boolean>;
};

export default function (config: ApplicationConfig): void {
    setWebsiteLocale(config.locale);
    setDarkTheme(config.isDarkTheme ?? false);

    if (config.isZoomDisabled) {
        disableZoom();
    }
}
