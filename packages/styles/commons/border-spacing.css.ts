import { styleVariants } from "@vanilla-extract/css";
import { SPACING_MAP } from "@wizleap-inc/wiz-ui-constants";

export const borderSpacingStyle = styleVariants(
  SPACING_MAP,
  (borderSpacing) => ({
    borderSpacing,
  })
);

export const borderSpacingXStyle = styleVariants(
  SPACING_MAP,
  (borderSpacingX) => ({
    borderSpacing: `0 ${borderSpacingX}`,
  })
);

export const borderSpacingYStyle = styleVariants(
  SPACING_MAP,
  (borderSpacingY) => ({
    borderSpacing: `${borderSpacingY} 0`,
  })
);
