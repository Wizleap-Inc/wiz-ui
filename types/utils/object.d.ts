import { FindDeep, ObjectKeysWithSeparator } from '../../../../../../src/types/utils/object';
export declare const getValueFromAccessor: <T extends object>(obj: T, accessor: ObjectKeysWithSeparator<T, keyof T>) => FindDeep<T>;
