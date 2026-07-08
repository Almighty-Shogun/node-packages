import type { DefaultTheme } from 'vitepress'

export const webkitNativeBridge: DefaultTheme.SidebarItem[] = [
    {
        text: 'WebKit Native Bridge',
        items: [
            { text: 'Introduction', link: '/webkit-native-bridge/' },
            { text: 'Installation', link: '/webkit-native-bridge/installation' },
            { text: 'Types', link: '/webkit-native-bridge/types' }
        ]
    },
    {
        text: 'Functions',
        collapsed: false,
        items: [
            { text: 'createNativeBridge', link: '/webkit-native-bridge/functions/createNativeBridge' },
            { text: 'mapBridgeError', link: '/webkit-native-bridge/functions/mapBridgeError' },
            { text: 'normalizeBridgeResponse', link: '/webkit-native-bridge/functions/normalizeBridgeResponse' },
            { text: 'getErrorDetailsAs', link: '/webkit-native-bridge/functions/getErrorDetailsAs' },
            { text: 'isNativeError', link: '/webkit-native-bridge/functions/isNativeError' },
            { text: 'isTransportError', link: '/webkit-native-bridge/functions/isTransportError' }
        ]
    },
    {
        text: 'Classes',
        collapsed: false,
        items: [
            { text: 'NativeBridgeError', link: '/webkit-native-bridge/classes/NativeBridgeError' },
            { text: 'NativeBridgeUnavailableError', link: '/webkit-native-bridge/classes/NativeBridgeUnavailableError' },
            { text: 'NativeBridgeDisposedError', link: '/webkit-native-bridge/classes/NativeBridgeDisposedError' }
        ]
    },
]
