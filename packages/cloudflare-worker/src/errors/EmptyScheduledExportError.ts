export default class EmptyScheduledExportError extends Error {
    public readonly exportName: string;

    public constructor(exportName: string) {
        super(`Scheduled export "${exportName}" cannot be an empty array.`);

        this.exportName = exportName;
        this.name = 'EmptyScheduledExportError';
    }
}
