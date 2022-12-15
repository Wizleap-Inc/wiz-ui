import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const avatarStyle = style({
  lineHeight: 1,
  borderRadius: "50%",
  overflow: "hidden",
});
export const avatarClickableStyle = style({
  cursor: "pointer",
});

export const avatarImageStyle = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const avatarFallbackStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  fontSize: THEME.fontSize.sm,
});
