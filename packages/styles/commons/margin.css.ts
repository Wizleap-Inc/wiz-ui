import { styleVariants } from "@vanilla-extract/css";
import { SPACING_MAP } from "@wizleap-inc/wiz-ui-constants";

export const marginStyle = styleVariants(SPACING_MAP, (margin) => ({
  margin,
}));

export const marginTopStyle = styleVariants(SPACING_MAP, (marginTop) => ({
  marginTop,
}));

export const marginRightStyle = styleVariants(SPACING_MAP, (marginRight) => ({
  marginRight,
}));

export const marginBottomStyle = styleVariants(SPACING_MAP, (marginBottom) => ({
  marginBottom,
}));

export const marginLeftStyle = styleVariants(SPACING_MAP, (marginLeft) => ({
  marginLeft,
}));

export const marginXStyle = styleVariants(SPACING_MAP, (marginX) => ({
  marginLeft: marginX,
  marginRight: marginX,
}));

export const marginYStyle = styleVariants(SPACING_MAP, (marginY) => ({
  marginTop: marginY,
  marginBottom: marginY,
}));
