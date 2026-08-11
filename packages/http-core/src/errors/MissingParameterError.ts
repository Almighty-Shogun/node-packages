export default class MissingParameterError extends Error {
    public readonly parameter: string;

    public constructor(parameter: string) {
        super(`Required query parameter "${parameter}" is missing.`);

        this.parameter = parameter;
        this.name = 'MissingParameterError';
    }
}
