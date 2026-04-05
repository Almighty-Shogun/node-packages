export class NativeBridgeError extends Error {
    constructor(message: string) {
        super(message);

        this.name = "NativeBridgeError";
    }
}

export class NativeBridgeUnavailableError extends NativeBridgeError {
    constructor(handlerName: string) {
        super(`WebKit native bridge handler "${handlerName}" is unavailable`);

        this.name = "NativeBridgeUnavailableError";
    }
}

export class NativeBridgeTimeoutError extends NativeBridgeError {
    constructor(method: string, timeout: number) {
        super(`Native request "${method}" timed out after ${timeout}ms`);

        this.name = "NativeBridgeTimeoutError";
    }
}

export class NativeBridgeResponseError extends NativeBridgeError {
    constructor(method: string, message?: string | null) {
        super(message ?? `Native request "${method}" failed`);

        this.name = "NativeBridgeResponseError";
    }
}

export class NativeBridgeDisposedError extends NativeBridgeError {
    constructor() {
        super("Native bridge has been disposed");

        this.name = "NativeBridgeDisposedError";
    }
}
