import { styleVariants } from "@vanilla-extract/css";
import { SPACING_MAP } from "@wizleap-inc/wiz-ui-constants";

export const paddingStyle = styleVariants(SPACING_MAP, (padding) => ({
  padding,
}));

export const paddingTopStyle = styleVariants(SPACING_MAP, (paddingTop) => ({
  paddingTop,
}));

export const paddingRightStyle = styleVariants(SPACING_MAP, (paddingRight) => ({
  paddingRight,
}));

export const paddingBottomStyle = styleVariants(
  SPACING_MAP,
  (paddingBottom) => ({
    paddingBottom,
  })
);

export const paddingLeftStyle = styleVariants(SPACING_MAP, (paddingLeft) => ({
  paddingLeft,
}));

export const paddingXStyle = styleVariants(SPACING_MAP, (paddingX) => ({
  paddingLeft: paddingX,
  paddingRight: paddingX,
}));

export const paddingYStyle = styleVariants(SPACING_MAP, (paddingY) => ({
  paddingTop: paddingY,
  paddingBottom: paddingY,
}));
