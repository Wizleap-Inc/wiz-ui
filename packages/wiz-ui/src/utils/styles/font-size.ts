import { FONT_SIZE_MAP } from "@wiz-ui/constants/styles/font-size";
import { FontSizeKeys } from "@wiz-ui/constants/styles/font-size";

export const getFontSizeCss = (fontSize: FontSizeKeys) =>
  FONT_SIZE_MAP[fontSize];
