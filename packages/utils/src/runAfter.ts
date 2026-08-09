export default function runAfter<T extends (...args: any[]) => any>(after: () => void): (fn: T) => T {
    return (fn: T): T => {
        return ((...args: Parameters<T>): ReturnType<T> => {
            const result = fn(...args);

            after();

            return result;
        }) as T;
    };
}
