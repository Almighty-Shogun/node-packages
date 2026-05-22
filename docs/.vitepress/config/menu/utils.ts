import type { DefaultTheme } from 'vitepress'

export const utils: DefaultTheme.SidebarItem[] = [
    {
        text: 'Utils',
        items: [
            { text: 'Introduction', link: '/utils/' },
            { text: 'Installation', link: '/utils/installation' }
        ]
    },
    {
        text: 'Locale',
        collapsed: false,
        items: [
            { text: 'getLanguage', link: '/utils/locale/getLanguage' },
            { text: 'getLanguages', link: '/utils/locale/getLanguages' }
        ]
    },
    {
        text: 'Date & Time',
        collapsed: false,
        items: [
            { text: 'addTime', link: '/utils/date-time/addTime' },
            { text: 'formatDate', link: '/utils/date-time/formatDate' },
            { text: 'formatDateTime', link: '/utils/date-time/formatDateTime' },
            { text: 'formatFullDate', link: '/utils/date-time/formatFullDate' },
            { text: 'formatHour', link: '/utils/date-time/formatHour' },
            { text: 'formatMonth', link: '/utils/date-time/formatMonth' },
            { text: 'formatRemainingTime', link: '/utils/date-time/formatRemainingTime' },
            { text: 'formatTime', link: '/utils/date-time/formatTime' },
            { text: 'formatWeekday', link: '/utils/date-time/formatWeekday' },
            { text: 'getToday', link: '/utils/date-time/getToday' },
            { text: 'isBeforeNow', link: '/utils/date-time/isBeforeNow' },
            { text: 'isToday', link: '/utils/date-time/isToday' }
        ]
    },
    {
        text: 'Numbers',
        collapsed: false,
        items: [
            { text: 'formatCelsius', link: '/utils/numbers/formatCelsius' },
            { text: 'formatCurrency', link: '/utils/numbers/formatCurrency' },
            { text: 'formatDutchCurrency', link: '/utils/numbers/formatDutchCurrency' },
            { text: 'formatDutchNumber', link: '/utils/numbers/formatDutchNumber' },
            { text: 'formatDutchPercentage', link: '/utils/numbers/formatDutchPercentage' },
            { text: 'formatNumber', link: '/utils/numbers/formatNumber' },
            { text: 'formatPercentage', link: '/utils/numbers/formatPercentage' }
        ]
    },
    {
        text: 'Browser & DOM',
        collapsed: false,
        items: [
            { text: 'delay', link: '/utils/browser-dom/delay' },
            { text: 'disableZoom', link: '/utils/browser-dom/disableZoom' },
            { text: 'initApplication', link: '/utils/browser-dom/initApplication' },
            { text: 'reload', link: '/utils/browser-dom/reload' },
            { text: 'scrollToTop', link: '/utils/browser-dom/scrollToTop' },
            { text: 'setDarkTheme', link: '/utils/browser-dom/setDarkTheme' },
            { text: 'setWebsiteLocale', link: '/utils/browser-dom/setWebsiteLocale' }
        ]
    }
]
