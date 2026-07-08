declare global {
    interface Array<T> {
        first(): T;

        last(): T;

        delete(index: number): T[];

        removeDuplicates(this: Array<string | number>): (string | number)[];

        addOrRemove(this: Array<string | number>, value: string | number): (string | number)[];

        isEmpty(): boolean;
    }
}

Array.prototype.first = function <T>(this: T[]): T {
    return this[0];
};

Array.prototype.last = function <T>(this: T[]): T {
    return this[this.length - 1];
};

Array.prototype.delete = function <T>(this: T[], index: number): T[] {
    return this.toSpliced(index, 1);
};

Array.prototype.removeDuplicates = function (this: (string | number)[]): (string | number)[] {
    return Array.from(new Set(this).values());
};

Array.prototype.addOrRemove = function (this: (string | number)[], value: string | number): (string | number)[] {
    if (this.includes(value)) {
        return this.delete(this.indexOf(value));
    }

    return [...this, value];
};

Array.prototype.isEmpty = function <T>(this: T[]): boolean {
    return this.length === 0;
};

export {};
