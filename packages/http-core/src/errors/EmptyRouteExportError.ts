export default class EmptyRouteExportError extends Error {
    public readonly exportName: string;

    public constructor(exportName: string) {
        super(`Route export "${exportName}" cannot be an empty array.`);

        this.exportName = exportName;
        this.name = 'EmptyRouteExportError';
    }
}
