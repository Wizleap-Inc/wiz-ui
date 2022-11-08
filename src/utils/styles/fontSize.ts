import { FONT_SIZE_MAP } from "@/constants/styles/fontSize";
import { FontSizeKeys } from "@/types/styles/fontSize";

export const getFontSizeCss = (fontSize: FontSizeKeys) =>
  FONT_SIZE_MAP[fontSize];
