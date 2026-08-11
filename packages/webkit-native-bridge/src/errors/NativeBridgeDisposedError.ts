export default class NativeBridgeDisposedError extends Error {
    public constructor() {
        super('Native bridge has been disposed');

        this.name = 'NativeBridgeDisposedError';
    }
}
