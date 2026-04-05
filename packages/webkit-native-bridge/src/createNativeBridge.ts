import {
    NativeBridgeDisposedError,
    NativeBridgeResponseError,
    NativeBridgeTimeoutError,
    NativeBridgeUnavailableError
} from './errors';
import type {
    NativeBridge,
    NativeBridgeOptions,
    NativeBridgePendingRequest,
    NativeBridgeRequestMap,
    NativeRequestBody,
    NativeRequestOptions,
    NativeResponseBody,
    NativeResponseEventDetail,
    NativeBridgeWindow,
    NativeBridgeMessageHandler
} from './types';

const DEFAULT_REQUEST_TIMEOUT = 30_000;
const DEFAULT_HANDLER_NAME = "nativeBridge";
const DEFAULT_EVENT_NAME = "webkit-native-bridge";

function getDefaultWindow(): NativeBridgeWindow | undefined {
    return typeof window === "undefined" ? undefined : window as NativeBridgeWindow;
}

function createRequestId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return `request_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function encodeRequestBody(body: unknown): string {
    return encodeURIComponent(JSON.stringify(body ?? null));
}

export function createNativeBridge<TRequests extends NativeBridgeRequestMap = Record<never, never>, TCommands extends string = never>(options: NativeBridgeOptions = {}): NativeBridge<TRequests, TCommands> {
    const eventName = options.eventName ?? DEFAULT_EVENT_NAME;
    const handlerName = options.handlerName ?? DEFAULT_HANDLER_NAME;
    const requestTimeout = options.requestTimeout === undefined ? DEFAULT_REQUEST_TIMEOUT : options.requestTimeout;

    const pendingRequests = new Map<string, NativeBridgePendingRequest & { method: string }>()

    let disposed = false;
    let responseListenerRegistered = false;

    const responseListener = (event: Event): void => {
        handleResponse((event as CustomEvent<NativeResponseEventDetail>).detail);
    }

    function getWindow(): NativeBridgeWindow | undefined {
        return options.window ?? getDefaultWindow();
    }

    function getBridge(): NativeBridgeMessageHandler | undefined {
        return getWindow()?.webkit?.messageHandlers?.[handlerName];
    }

    function ensureActive(): void {
        if (disposed) {
            throw new NativeBridgeDisposedError();
        }
    }

    function ensureBridge(): NativeBridgeMessageHandler {
        const bridge = getBridge();

        if (!bridge) {
            throw new NativeBridgeUnavailableError(handlerName);
        }

        return bridge;
    }

    function registerResponseListener(): void {
        if (responseListenerRegistered) return;

        const currentWindow = getWindow();

        if (!currentWindow) return;

        currentWindow.addEventListener(eventName, responseListener);
        responseListenerRegistered = true;
    }

    function clearPendingRequest(requestId: string): void {
        const pendingRequest = pendingRequests.get(requestId);

        if (!pendingRequest) return;

        if (pendingRequest.timeoutId !== null) {
            clearTimeout(pendingRequest.timeoutId);
        }

        pendingRequests.delete(requestId);
    }

    function postMessage(message: string): void {
        ensureActive();
        ensureBridge().postMessage(message);
    }

    function call(method: TCommands): void {
        postMessage(method);
    }

    function handleResponse(detail: NativeResponseEventDetail): void {
        const requestId = detail.requestId;

        if (!requestId) return;

        const pendingRequest = pendingRequests.get(requestId);

        if (!pendingRequest) return;

        clearPendingRequest(requestId)

        if (detail.ok) {
            pendingRequest.resolve(detail.payload);
            return;
        }

        pendingRequest.reject(new NativeBridgeResponseError(pendingRequest.method, detail.error));
    }

    function dispose(): void {
        if (disposed) return;

        disposed = true;

        if (responseListenerRegistered) {
            getWindow()?.removeEventListener(eventName, responseListener);
            responseListenerRegistered = false;
        }

        for (const [requestId, pendingRequest] of pendingRequests) {
            clearPendingRequest(requestId);
            pendingRequest.reject(new NativeBridgeDisposedError());
        }
    }

    function request<TMethod extends keyof TRequests>(method: TMethod, body?: NativeRequestBody<TRequests, TMethod>, maybeOptions?: NativeRequestOptions): Promise<NativeResponseBody<TRequests, TMethod>> {
        ensureActive();
        registerResponseListener();

        const requestOptions = maybeOptions;

        return new Promise<NativeResponseBody<TRequests, TMethod>>((resolve, reject) => {
            const requestId = createRequestId();
            const timeout = requestOptions?.timeout ?? requestTimeout;
            const timeoutId = timeout === null ? null : setTimeout(() => {
                clearPendingRequest(requestId);
                reject(new NativeBridgeTimeoutError(String(method), timeout))
            }, timeout);

            pendingRequests.set(requestId, {
                method: String(method),
                reject,
                resolve,
                timeoutId,
            });

            try {
                postMessage(`request:${requestId}|${String(method)}|${encodeRequestBody(body)}`);
            } catch (error) {
                clearPendingRequest(requestId);
                reject(error);
            }
        })
    }

    return {
        call,
        dispose,
        handleResponse,
        isAvailable: () => getBridge() !== undefined,
        postMessage,
        request: request as NativeBridge<TRequests, TCommands>['request'],
    }
}
