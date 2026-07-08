declare global {
    interface Number {
        add(value: number): number;

        subtract(value: number): number;

        multiply(value: number): number;

        divide(value: number): number;

        equals(value: number): boolean;

        isInRange(min: number, max: number): boolean;

        isEven(): boolean;

        isLowerThan(value: number, allowEqual?: boolean): boolean;

        isGreaterThan(value: number, allowEqual?: boolean): boolean;
    }
}

Number.prototype.add = function (this: number, value: number): number {
    return this + value;
};

Number.prototype.subtract = function (this: number, value: number): number {
    return this - value;
};

Number.prototype.multiply = function (this: number, value: number): number {
    return this * value;
};

Number.prototype.divide = function (this: number, value: number): number {
    return this / value;
};

Number.prototype.equals = function (this: number, value: number): boolean {
    return this === value;
};

Number.prototype.isInRange = function (this: number, min: number, max: number): boolean {
    return this >= min && this <= max;
};

Number.prototype.isEven = function (this: number): boolean {
    return this % 2 === 0;
};

Number.prototype.isLowerThan = function (this: number, value: number, allowEqual: boolean = false): boolean {
    return allowEqual ? this <= value : this < value;
};

Number.prototype.isGreaterThan = function (this: number, value: number, allowEqual: boolean = false): boolean {
    return allowEqual ? this >= value : this > value;
};

export {};
