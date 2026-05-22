import type { DefaultTheme } from 'vitepress'

export const webkitNativeBridge: DefaultTheme.SidebarItem[] = [
    {
        text: 'WebKit Native Bridge',
        items: [
            { text: 'Introduction', link: '/webkit-native-bridge/' },
            { text: 'Installation', link: '/webkit-native-bridge/installation' }
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
    {
        text: 'Bridge Types',
        collapsed: false,
        items: [
            { text: 'BridgeSuccess', link: '/webkit-native-bridge/types/bridge/BridgeSuccess' },
            { text: 'BridgeError', link: '/webkit-native-bridge/types/bridge/BridgeError' },
            { text: 'BridgeFailure', link: '/webkit-native-bridge/types/bridge/BridgeFailure' },
            { text: 'BridgeResponse', link: '/webkit-native-bridge/types/bridge/BridgeResponse' },
            { text: 'ResolvedBridgeError', link: '/webkit-native-bridge/types/bridge/ResolvedBridgeError' },
            { text: 'NormalizedBridgeResponse', link: '/webkit-native-bridge/types/bridge/NormalizedBridgeResponse' }
        ]
    },
    {
        text: 'Native Types',
        collapsed: false,
        items: [
            { text: 'NativeBridge', link: '/webkit-native-bridge/types/native/NativeBridge' },
            { text: 'NativeBridgeOptions', link: '/webkit-native-bridge/types/native/NativeBridgeOptions' },
            { text: 'NativeBridgeRequestMap', link: '/webkit-native-bridge/types/native/NativeBridgeRequestMap' },
            { text: 'NativeBridgeWindow', link: '/webkit-native-bridge/types/native/NativeBridgeWindow' },
            { text: 'NativeErrorCode', link: '/webkit-native-bridge/types/native/NativeErrorCode' },
            { text: 'NativeErrorDetails', link: '/webkit-native-bridge/types/native/NativeErrorDetails' },
            { text: 'NativeMethodsWithBody', link: '/webkit-native-bridge/types/native/NativeMethodsWithBody' },
            { text: 'NativeMethodsWithoutBody', link: '/webkit-native-bridge/types/native/NativeMethodsWithoutBody' },
            { text: 'NativeRequestBody', link: '/webkit-native-bridge/types/native/NativeRequestBody' },
            { text: 'NativeRequestOptions', link: '/webkit-native-bridge/types/native/NativeRequestOptions' },
            { text: 'NativeResponseBody', link: '/webkit-native-bridge/types/native/NativeResponseBody' },
            { text: 'NativeResponseEventDetail', link: '/webkit-native-bridge/types/native/NativeResponseEventDetail' },
            { text: 'NativeTransportErrorCode', link: '/webkit-native-bridge/types/native/NativeTransportErrorCode' },
            { text: 'NativeTransportErrorDetails', link: '/webkit-native-bridge/types/native/NativeTransportErrorDetails' }
        ]
    }
]
