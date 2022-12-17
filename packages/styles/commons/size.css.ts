import { styleVariants } from "@vanilla-extract/css";
import { SPACING_MAP } from "@wizleap-inc/wiz-ui-constants";

export const sizeStyle = styleVariants(SPACING_MAP, (value) => ({
  width: value,
  height: value,
}));
