import { styleVariants } from "@vanilla-extract/css";
import { SPACING_MAP } from "@wizleap-inc/wiz-ui-constants";

export const gapStyle = styleVariants(SPACING_MAP, (gap) => ({
  gap,
}));

export const gapXStyle = styleVariants(SPACING_MAP, (gapX) => ({
  columnGap: gapX,
}));

export const gapYStyle = styleVariants(SPACING_MAP, (gapY) => ({
  rowGap: gapY,
}));
