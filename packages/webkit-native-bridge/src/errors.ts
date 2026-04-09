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

export class NativeBridgeDisposedError extends NativeBridgeError {
    constructor() {
        super("Native bridge has been disposed");

        this.name = "NativeBridgeDisposedError";
    }
}
