import { COLOR_MAP } from "@/constants/styles/color";
import { ObjectKeysWithSeparator } from "@/types/utils/object";

export type ColorKeys = ObjectKeysWithSeparator<typeof COLOR_MAP>;

interface ColorPropsItems {
  color: ColorKeys;
  bgColor: ColorKeys;
}

export type ColorProps = Partial<ColorPropsItems>;
