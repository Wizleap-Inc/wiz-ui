/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindDeep, ObjectKeysWithSeparator } from "@/types/utils/object";

export const getValueFromAccessor = <T extends Readonly<object>>(
  obj: T,
  accessor: ObjectKeysWithSeparator<T>
): FindDeep<T> => {
  const colorSelectors = accessor.split(".");

  const findDeep = <T extends Record<string, any>>(
    colorMap: T,
    colorSelectors: string[]
  ): FindDeep<T> => {
    if (colorSelectors.length === 1) return colorMap[colorSelectors[0]];
    return findDeep(colorMap[colorSelectors[0]], colorSelectors.slice(1));
  };

  return findDeep(obj, colorSelectors);
};
