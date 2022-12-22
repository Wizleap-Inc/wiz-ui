import { styleVariants } from "@vanilla-extract/css";
import { FONT_WEIGHT_MAP } from "@wizleap-inc/wiz-ui-constants";

export const fontWeightStyle = styleVariants(FONT_WEIGHT_MAP, (fontWeight) => ({
  fontWeight,
}));
