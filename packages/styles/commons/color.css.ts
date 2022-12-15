import { styleVariants } from "@vanilla-extract/css";
import { FLAT_COLOR_MAP } from "@wizleap-inc/wiz-ui-constants";

export const colorStyle = styleVariants(FLAT_COLOR_MAP, (color) => ({
  color,
}));
