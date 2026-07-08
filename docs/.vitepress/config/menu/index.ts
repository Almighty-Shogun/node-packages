import { guide } from './guide'
import { utils } from './utils'
import { common } from './common'
import { bunServer } from './bun-server'
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
        activeMatch: '^/(prototype-extensions|utils|common|webkit-native-bridge|bun-server)/',
        items: [
            { text: 'Prototype Extensions', activeMatch: '^/prototype-extensions/', link: '/prototype-extensions/' },
            { text: 'Utils', activeMatch: '^/utils/', link: '/utils/' },
            { text: 'Common', activeMatch: '^/common/', link: '/common/' },
            { text: 'WebKit Native Bridge', activeMatch: '^/webkit-native-bridge/', link: '/webkit-native-bridge/' },
            { text: 'Bun Server', activeMatch: '^/bun-server/', link: '/bun-server/' }
        ]
    }
];

export const sidebar: DefaultTheme.SidebarMulti = {
    '/guide/': guide,
    '/prototype-extensions/': prototypeExtensions,
    '/utils/': utils,
    '/common/': common,
    '/webkit-native-bridge/': webkitNativeBridge,
    '/bun-server/': bunServer
};
