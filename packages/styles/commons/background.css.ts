import { styleVariants } from "@vanilla-extract/css";
import { FLAT_COLOR_MAP } from "@wizleap-inc/wiz-ui-constants";

export const backgroundStyle = styleVariants(FLAT_COLOR_MAP, (background) => ({
  background,
}));

export const strokeStyle = styleVariants(FLAT_COLOR_MAP, (stroke) => ({
  stroke,
}));
