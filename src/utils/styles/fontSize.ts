import { FontSizeKeys, FONT_SIZE_MAP } from "@/constants/styles/fontSize";

export const getFontSizeCss = (fontSize: FontSizeKeys) =>
  FONT_SIZE_MAP[fontSize];
