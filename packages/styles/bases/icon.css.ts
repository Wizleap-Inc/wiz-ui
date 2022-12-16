import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const iconStyle = style({
  lineHeight: 1,
  position: "relative",
  width: "fit-content",
  height: "fit-content",
});

export const iconBadgeTextStyle = style({
  fontSize: THEME.fontSize.xs2,
});

export const iconBadgeStyle = style({
  position: "absolute",
  top: "-40%",
  right: "-40%",
  width: THEME.fontSize.xl2,
  height: THEME.fontSize.xl2,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
