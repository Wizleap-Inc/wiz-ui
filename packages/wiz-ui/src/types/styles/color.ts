import { COLOR_MAP } from "@wiz-ui/constants/styles/color";

import { ObjectKeysWithSeparator } from "@/types/utils/object";

export type ColorKeys = ObjectKeysWithSeparator<typeof COLOR_MAP>;

interface ColorPropsItems {
  color: ColorKeys;
  bgColor: ColorKeys;
}

export type ColorProps = Partial<ColorPropsItems>;

export type ColorKeysSplit = ColorKeys extends `${infer Keys}`
  ? Keys extends `${infer Key}.${infer Rest}`
    ? [Key, Rest]
    : [Keys]
  : never;
