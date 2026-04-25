import disableZoom from './disableZoom'
import setDarkTheme from './setDarkTheme'
import setWebsiteLocale from './setWebsiteLocale'

type ApplicationConfig = {
    locale?: string;
    isDarkTheme?: boolean;
    isZoomDisabled?: boolean;
};

export default function (config: ApplicationConfig): void {
    setWebsiteLocale(config.locale);
    setDarkTheme(config.isDarkTheme ?? false);

    if (config.isZoomDisabled) {
        disableZoom();
    }
}
