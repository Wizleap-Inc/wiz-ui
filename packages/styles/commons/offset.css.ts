import { styleVariants } from "@vanilla-extract/css";
import { SPACING_MAP } from "@wizleap-inc/wiz-ui-constants";

export const topStyle = styleVariants(SPACING_MAP, (value) => ({
  top: value,
}));

export const bottomStyle = styleVariants(SPACING_MAP, (value) => ({
  bottom: value,
}));

export const leftStyle = styleVariants(SPACING_MAP, (value) => ({
  left: value,
}));

export const rightStyle = styleVariants(SPACING_MAP, (value) => ({
  right: value,
}));
