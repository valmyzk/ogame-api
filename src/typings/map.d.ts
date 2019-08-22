
interface ReadonlyCustomMap<T> {

    forEach(callbackfn: (value: T[keyof T], key: string, map: this) => void, thisArg?: any): void;
    get<K extends keyof T>(key: K): T[K];
    has(key: keyof T): boolean;
    entries(): IterableIterator<[string, T[keyof T]]>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<T[keyof T]>;
    [Symbol.iterator](): IterableIterator<[string, T[keyof T]]>;
    readonly [Symbol.toStringTag]: string;
    readonly size: number;

}

type FlexibleMap<T, K, V> = T & {

    get(key: K): V;

}

interface CustomMap<T> extends ReadonlyCustomMap<T> {

    clear(): void;
    delete(key: keyof T): boolean;
    set(key: keyof T, value: T[keyof T]): this;

}