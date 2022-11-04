import { COLOR_MAP } from "@/constants/styles/color";
import { ObjectKeysWithSeparator } from "@/types/utils/object";

export type ColorSelects = ObjectKeysWithSeparator<typeof COLOR_MAP>;

interface ColorPropsItems {
  color: ColorSelects;
  bgColor: ColorSelects;
}

export type ColorProps = Partial<ColorPropsItems>;
