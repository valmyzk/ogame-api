export declare type Writable<T> = {
    -readonly [K in keyof T]: T[K];
};
export declare type Solo<T> = T | T[];