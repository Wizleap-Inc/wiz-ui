export type ObjectKeysWithSeparator<
  T extends Record<string, any>,
  K extends keyof T = keyof T
> = K extends string
  ? T[K] extends any[]
    ? K
    : T[K] extends object
    ? `${K}.${ObjectKeysWithSeparator<T[K]>}`
    : K
  : never;

export type FindDeep<T> = T extends Record<string, infer U> ? FindDeep<U> : T;

export type Entries<TObj> = {
  [Key in keyof TObj]: [keyof Pick<TObj, Key>, TObj[Key]];
}[keyof TObj][];
