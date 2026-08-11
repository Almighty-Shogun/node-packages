export default class InvalidParameterError extends Error {
    public readonly parameter: string;
    public readonly expected: string;

    public constructor(parameter: string, expected: string) {
        super(`Query parameter "${parameter}" is not ${expected}.`);

        this.expected = expected;
        this.parameter = parameter;
        this.name = 'InvalidParameterError';
    }
}
