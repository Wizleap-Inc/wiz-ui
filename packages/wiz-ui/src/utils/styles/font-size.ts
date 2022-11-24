import { FONT_SIZE_MAP } from "@/constants/styles/font-size";
import { FontSizeKeys } from "@/types/styles/font-size";

export const getFontSizeCss = (fontSize: FontSizeKeys) =>
  FONT_SIZE_MAP[fontSize];
