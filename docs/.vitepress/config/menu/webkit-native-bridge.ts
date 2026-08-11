import type { DefaultTheme } from 'vitepress'

export const webkitNativeBridge: DefaultTheme.SidebarItem[] = [
    {
        text: 'WebKit Native Bridge',
        items: [
            { text: 'Introduction', link: '/webkit-native-bridge/' },
            { text: 'Installation', link: '/webkit-native-bridge/installation' },
            { text: 'Types', link: '/webkit-native-bridge/types' },
            { text: 'Errors', link: '/webkit-native-bridge/errors' }
        ]
    },
    {
        text: 'Bridge',
        collapsed: false,
        items: [
            { text: 'createNativeBridge', link: '/webkit-native-bridge/functions/createNativeBridge' }
        ]
    },
    {
        text: 'Utilities',
        collapsed: false,
        items: [
            { text: 'getErrorDetailsAs', link: '/webkit-native-bridge/functions/getErrorDetailsAs' },
            { text: 'isNativeError', link: '/webkit-native-bridge/functions/isNativeError' },
            { text: 'isTransportError', link: '/webkit-native-bridge/functions/isTransportError' },
            { text: 'mapBridgeError', link: '/webkit-native-bridge/functions/mapBridgeError' },
            { text: 'normalizeBridgeResponse', link: '/webkit-native-bridge/functions/normalizeBridgeResponse' }
        ]
    }
];
