import { styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const sizeStyle = styleVariants(THEME.spacing, (value) => ({
  width: value,
  height: value,
}));
