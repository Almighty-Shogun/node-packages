export type Arrayable<T> = T | T[];

export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type NullableOrUndefinable<T> = Nullable<T> | Undefinable<T>;

export type Promisable<T> = T | Promise<T>;

export type PromiseGetter<T> = (() => Promise<T>);

export type PromiseOrGetter<T> = Promise<T> | PromiseGetter<T>;

export type HTMLTarget = HTMLElement | Window | Document;
