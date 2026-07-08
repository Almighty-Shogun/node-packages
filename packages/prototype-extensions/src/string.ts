declare global {
    interface String {
        toSlug(): string;

        append(value: string): string;

        limit(length: number, appending: string | null): string;

        toNumber(): number;

        isEmpty(): boolean;

        equals(value: string): boolean;
    }
}

String.prototype.toSlug = function (this: string): string {
    return this.trim().toLowerCase()
        .replace(/[^\w\s-]+/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

String.prototype.toNumber = function (this: string): number {
    return Number(this);
};

String.prototype.isEmpty = function (this: string): boolean {
    return this.length === 0;
};

String.prototype.equals = function (this: string, value: string): boolean {
    return this === value;
};

String.prototype.append = function (this: string, value: string): string {
    return this + value;
};

String.prototype.limit = function (this: string, length: number, appending: string | null = null): string {
    return this.length > length ? this.substring(0, length) + appending : this;
};

export {};
