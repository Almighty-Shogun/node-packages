import { guide } from './guide'
import { utils } from './utils'
import { vueUtils } from './vue-utils'
import type { DefaultTheme } from 'vitepress'
import { webkitNativeBridge } from './webkit-native-bridge'
import { prototypeExtensions } from './prototype-extensions'

export const nav: DefaultTheme.NavItem[] = [
    {
        text: 'Guide',
        link: '/guide/',
        activeMatch: '^/guide/',
    },
    {
        text: 'Packages',
        activeMatch: '^/(prototype-extensions|utils|vue-utils|webkit-native-bridge)/',
        items: [
            { text: 'Prototype Extensions', activeMatch: '^/prototype-extensions/', link: '/prototype-extensions/' },
            { text: 'Utils', activeMatch: '^/utils/', link: '/utils/' },
            { text: 'Vue Utils', activeMatch: '^/vue-utils/', link: '/vue-utils/' },
            { text: 'WebKit Native Bridge', activeMatch: '^/webkit-native-bridge/', link: '/webkit-native-bridge/' }
        ]
    }
];

export const sidebar: DefaultTheme.SidebarMulti = {
    '/guide/': guide,
    '/prototype-extensions/': prototypeExtensions,
    '/utils/': utils,
    '/vue-utils/': vueUtils,
    '/webkit-native-bridge/': webkitNativeBridge
};
