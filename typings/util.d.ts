export declare type Writable<T> = {
    -readonly [K in keyof T]: T[K];
};
export declare type Solo<T> = T | T[];
export declare type SoloType<T> = T extends Solo<infer R> ? R : never; 
export declare type ResolveSolo<T> = SoloType<T>[];
export declare type ValueType<T> = T[keyof T];