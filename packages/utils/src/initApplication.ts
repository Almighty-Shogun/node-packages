import disableZoom from './disableZoom'
import useDarkTheme from './useDarkTheme'
import useWebsiteLocale from './useWebsiteLocale'

type ApplicationConfig = {
    locale?: string;
    isDarkTheme?: boolean;
    isZoomDisabled?: boolean;
};

export default function (config: ApplicationConfig): void {
    useWebsiteLocale(config.locale);
    useDarkTheme(config.isDarkTheme ?? false);

    if (config.isZoomDisabled) {
        disableZoom();
    }
}
