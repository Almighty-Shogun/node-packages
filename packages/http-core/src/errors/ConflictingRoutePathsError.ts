export default class ConflictingRoutePathsError extends Error {
    public readonly existing: string;
    public readonly incoming: string;

    public constructor(existing: string, incoming: string) {
        super(`Conflicting route paths: "${existing}" and "${incoming}".`);

        this.existing = existing;
        this.incoming = incoming;
        this.name = 'ConflictingRoutePathsError';
    }
}
