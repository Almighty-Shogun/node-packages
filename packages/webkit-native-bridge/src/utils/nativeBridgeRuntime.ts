import type { NativeBridgeWindow } from '../types'

export function getDefaultWindow(): NativeBridgeWindow | undefined {
    return typeof window === "undefined" ? undefined : window as NativeBridgeWindow;
}

export function createRequestId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return `request_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function encodeRequestBody(body: unknown): string {
    return encodeURIComponent(JSON.stringify(body ?? null));
}
