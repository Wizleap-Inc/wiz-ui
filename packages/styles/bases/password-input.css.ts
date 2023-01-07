import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const passwordStyle = style({
  position: "relative",
});

export const passwordInputStyle = style({
  "::placeholder": {
    fontSize: `calc((${THEME.fontSize.sm} + ${THEME.fontSize.xs}) / 2)`,
  },
});

export const passwordExpandStyle = styleVariants({
  default: {
    width: "fit-content",
  },
  expand: {
    width: "100%",
  },
});

export const passwordVisibleIconStyle = style({
  position: "absolute",
  right: THEME.spacing.sm,
  top: "0",
  bottom: "0",
  margin: "auto",
  cursor: "pointer",
  display: "flex",
  background: "none",
  border: "none",
  alignItems: "center",
  justifyContent: "center",
  fontSize: THEME.fontSize.xl2,
  lineHeight: THEME.fontSize.xl2,
  width: THEME.fontSize.xl2,
  height: THEME.fontSize.xl2,
  padding: THEME.spacing.no,
  fill: THEME.color.gray["400"],
});

export const passwordVisibleIconActiveStyle = style({
  fill: THEME.color.green["800"],
});
