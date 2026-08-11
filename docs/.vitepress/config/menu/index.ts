import { guide } from './guide';
import { utils } from './utils';
import { common } from './common';
import { packages } from './packages';
import { httpCore } from './http-core';
import { bunServer } from './bun-server';
import { cloudflareWorker } from './cloudflare-worker';
import type { DefaultTheme } from 'vitepress';
import { webkitNativeBridge } from './webkit-native-bridge';
import { prototypeExtensions } from './prototype-extensions';

export const nav: DefaultTheme.NavItem[] = [
    {
        text: 'Guide',
        link: '/guide/',
        activeMatch: '^/guide/'
    },
    {
        text: 'Packages',
        activeMatch: '^/(packages$|prototype-extensions|utils|http-core|common|webkit-native-bridge|bun-server|cloudflare-worker)',
        items: [
            { text: 'Overview', activeMatch: '^/packages$', link: '/packages' },
            {
                text: 'Foundation',
                items: [
                    { text: 'HTTP Core', activeMatch: '^/http-core/', link: '/http-core/' },
                    { text: 'Prototype Extensions', activeMatch: '^/prototype-extensions/', link: '/prototype-extensions/' },
                    { text: 'Utils', activeMatch: '^/utils/', link: '/utils/' }
                ]
            },
            {
                text: 'Vue',
                items: [
                    { text: 'Common', activeMatch: '^/common/', link: '/common/' }
                ]
            },
            {
                text: 'Runtime',
                items: [
                    { text: 'Bun Server', activeMatch: '^/bun-server/', link: '/bun-server/' },
                    { text: 'Cloudflare Worker', activeMatch: '^/cloudflare-worker/', link: '/cloudflare-worker/' },
                    { text: 'WebKit Native Bridge', activeMatch: '^/webkit-native-bridge/', link: '/webkit-native-bridge/' }
                ]
            }
        ]
    }
];

export const sidebar: DefaultTheme.SidebarMulti = {
    '/guide/': guide,
    '/packages': packages,
    '/prototype-extensions/': prototypeExtensions,
    '/utils/': utils,
    '/http-core/': httpCore,
    '/common/': common,
    '/webkit-native-bridge/': webkitNativeBridge,
    '/bun-server/': bunServer,
    '/cloudflare-worker/': cloudflareWorker
};
