export default class NativeBridgeUnavailableError extends Error {
    public readonly handlerName: string;

    public constructor(handlerName: string) {
        super(`WebKit native bridge handler "${handlerName}" is unavailable`);

        this.name = 'NativeBridgeUnavailableError';
        this.handlerName = handlerName;
    }
}
