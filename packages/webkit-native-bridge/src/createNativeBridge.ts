import { createTransportError } from './utils/errorFactories'
import { normalizeNativeError } from './utils/normalizeNativeError'
import { NativeBridgeDisposedError, NativeBridgeUnavailableError } from './errors'
import { DEFAULT_EVENT_NAME, DEFAULT_HANDLER_NAME, DEFAULT_REQUEST_TIMEOUT } from './constants'
import { createRequestId, encodeRequestBody, getDefaultWindow } from './utils/nativeBridgeRuntime'

import type {
    BridgeResponse,
    NativeBridge,
    NativeBridgeMessageHandler,
    NativeBridgeOptions,
    NativeBridgePendingRequest,
    NativeBridgeRequestMap,
    NativeBridgeWindow,
    NativeErrorCode,
    NativeErrorDetails,
    NativeRequestBody,
    NativeRequestOptions,
    NativeResponseBody,
    NativeResponseEventDetail,
    NativeTransportErrorCode,
    NativeTransportErrorDetails
} from './types'

export function createNativeBridge<TRequests extends NativeBridgeRequestMap = Record<never, never>, TCommands extends string = never>(options: NativeBridgeOptions = {}): NativeBridge<TRequests, TCommands> {
    const eventName = options.eventName ?? DEFAULT_EVENT_NAME;
    const handlerName = options.handlerName ?? DEFAULT_HANDLER_NAME;
    const requestTimeout = options.requestTimeout === undefined ? DEFAULT_REQUEST_TIMEOUT : options.requestTimeout;

    const pendingRequests = new Map<string, NativeBridgePendingRequest>();

    let disposed = false;
    let responseListenerRegistered = false;

    const responseListener = (event: Event): void => {
        handleResponse((event as CustomEvent<NativeResponseEventDetail>).detail);
    };

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

        const resolvedMessage = typeof detail.error === "object" && detail.error !== null && "message" in detail.error && typeof (detail.error as { message?: unknown }).message === "string"
            ? (detail.error as { message: string }).message : typeof detail.error === "string" ? detail.error : null;

        pendingRequest.resolve({
            ok: false,
            message: resolvedMessage,
            error: normalizeNativeError(detail.error, resolvedMessage),
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
                error: createTransportError("DISPOSED", new NativeBridgeDisposedError().message),
            });
        }
    }

    function request<TMethod extends keyof TRequests>(
        method: TMethod,
        body?: NativeRequestBody<TRequests, TMethod>,
        maybeOptions?: NativeRequestOptions
    ): Promise<BridgeResponse<
        NativeResponseBody<TRequests, TMethod>,
        NativeErrorCode<TRequests, TMethod> | NativeTransportErrorCode,
        NativeErrorDetails<TRequests, TMethod> | NativeTransportErrorDetails
    >> {
        ensureActive();
        registerResponseListener();

        const requestOptions = maybeOptions;

        return new Promise<BridgeResponse<
            NativeResponseBody<TRequests, TMethod>,
            NativeErrorCode<TRequests, TMethod> | NativeTransportErrorCode,
            NativeErrorDetails<TRequests, TMethod> | NativeTransportErrorDetails
        >>((resolve) => {
            const requestId = createRequestId();
            const timeout = requestOptions?.timeout ?? requestTimeout;

            const timeoutId = timeout === null ? null : setTimeout(() => {
                clearPendingRequest(requestId);

                resolve({
                    ok: false,
                    message: `Native request "${String(method)}" timed out after ${timeout}ms`,
                    error: createTransportError("TIMEOUT", `Native request "${String(method)}" timed out after ${timeout}ms`),
                });
            }, timeout);

            pendingRequests.set(requestId, {
                method: String(method),
                resolve: resolve as (value: BridgeResponse<unknown>) => void,
                timeoutId,
            });

            try {
                postMessage(`request:${requestId}|${String(method)}|${encodeRequestBody(body)}`);
            } catch (error) {
                clearPendingRequest(requestId);

                const transportError = error instanceof NativeBridgeUnavailableError
                    ? createTransportError("UNAVAILABLE", error.message, { cause: error }) : error instanceof NativeBridgeDisposedError
                        ? createTransportError("DISPOSED", error.message, { cause: error })
                        : createTransportError("UNKNOWN", error instanceof Error ? error.message : "Unknown native bridge error.", { cause: error });

                resolve({
                    ok: false,
                    message: transportError.message,
                    error: transportError,
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
    };
}
