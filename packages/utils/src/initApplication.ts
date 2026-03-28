import disableZoom from './disableZoom'
import useDarkTheme from './useDarkTheme'
import getCorrectLocale from './internal/getCorrectLocale'

type ApplicationConfig = {
    locale?: string;
    isDarkTheme?: boolean;
    isZoomDisabled?: boolean;
};

export default function (config: ApplicationConfig): void {
    document.documentElement.setAttribute("lang", getCorrectLocale(config.locale));

    useDarkTheme(config.isDarkTheme ?? false);

    if (config.isZoomDisabled) {
        disableZoom();
    }
}
