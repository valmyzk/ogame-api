
export declare interface ReadonlyCustomMap<T> {

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

export declare type MapValueType<T> = T extends ReadonlyCustomMap<infer I> ? I[keyof I] : T extends Map<unknown, infer V> ? V : never;
export declare type MapKeyType<T> = T extends ReadonlyCustomMap<any> ? string : T extends Map<infer K, unknown> ? K : never;

export declare type FlexibleMap<T> = T & {

    get(key: MapKeyType<T>): MapValueType<T>;

}

export declare interface CustomMap<T> extends ReadonlyCustomMap<T> {

    clear(): void;
    delete(key: keyof T): boolean;
    set(key: keyof T, value: T[keyof T]): this;

}