import { style, styleVariants } from "@vanilla-extract/css";
import {
  THEME,
} from "@wizleap-inc/wiz-ui-constants";

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
});

export const avatarFontSizeStyle = styleVariants({
  md: { fontSize: THEME.fontSize.xs2 },
  lg: { fontSize: THEME.fontSize.xs2 },
  xl: { fontSize: THEME.fontSize.xs },
  xl2: { fontSize: THEME.fontSize.sm },
  xl3: { fontSize: THEME.fontSize.md },
  xl4: { fontSize: THEME.fontSize.lg },
});
