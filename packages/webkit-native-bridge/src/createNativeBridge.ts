import {
    NativeBridgeDisposedError,
    NativeBridgeUnavailableError
} from './errors'
import type {
    NativeBridge,
    NativeBridgeOptions,
    NativeBridgePendingRequest,
    NativeBridgeRequestMap,
    NativeRequestBody,
    NativeRequestOptions,
    NativeResponseEventDetail,
    NativeBridgeWindow,
    NativeBridgeMessageHandler,
    BridgeResponse,
    NativeResponseBody
} from './types'

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

    const pendingRequests = new Map<string, NativeBridgePendingRequest>()

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

        clearPendingRequest(requestId);

        if (detail.ok) {
            pendingRequest.resolve({
                ok: true,
                message: null,
                data: detail.payload,
            });
            return;
        }

        if (typeof detail.error === "object" && detail.error !== null) {
            const errorObject = detail.error as { message?: string | null; error?: unknown };

            pendingRequest.resolve({
                ok: false,
                message: errorObject.message ?? null,
                error: errorObject.error ?? null,
            });
            return;
        }

        pendingRequest.resolve({
            ok: false,
            message: typeof detail.error === "string" ? detail.error : null,
            error: detail.error,
        });
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
            pendingRequest.resolve({
                ok: false,
                message: new NativeBridgeDisposedError().message,
                error: { type: "disposed" },
            });
        }
    }

    function request<TMethod extends keyof TRequests, TError = unknown>(method: TMethod, body?: NativeRequestBody<TRequests, TMethod>, maybeOptions?: NativeRequestOptions): Promise<BridgeResponse<NativeResponseBody<TRequests, TMethod>, TError>> {
        ensureActive();
        registerResponseListener();

        const requestOptions = maybeOptions;

        return new Promise<BridgeResponse<NativeResponseBody<TRequests, TMethod>, TError>>((resolve) => {
            const requestId = createRequestId();
            const timeout = requestOptions?.timeout ?? requestTimeout;

            const timeoutId = timeout === null ? null : setTimeout(() => {
                clearPendingRequest(requestId);

                resolve({
                    ok: false,
                    message: `Native request "${String(method)}" timed out after ${timeout}ms`,
                    error: { type: "timeout" } as TError,
                });
            }, timeout);

            pendingRequests.set(requestId, {
                method: String(method),
                resolve: resolve as (value: BridgeResponse<unknown, unknown>) => void,
                timeoutId,
            });

            try {
                postMessage(`request:${requestId}|${String(method)}|${encodeRequestBody(body)}`);
            } catch (error) {
                clearPendingRequest(requestId);
                resolve({
                    ok: false,
                    message: error instanceof Error ? error.message : "Unknown native bridge error.",
                    error: error as TError,
                });
            }
        });
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
