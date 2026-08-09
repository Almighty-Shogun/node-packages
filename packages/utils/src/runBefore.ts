export default function <T extends (...args: any[]) => any>(before: () => void): (fn: T) => T {
    return (fn: T): T => {
        return ((...args: Parameters<T>): ReturnType<T> => {
            before();

            return fn(...args);
        }) as T;
    };
}
