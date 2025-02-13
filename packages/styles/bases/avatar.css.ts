import { style } from "@vanilla-extract/css";
import {
  FontSizeKeys,
  SpacingKeys,
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
  fontSize: THEME.fontSize.sm,
});

// サイズに合わせて可変となるフォントサイズのマップ
export const fontSizeMap: Record<
  Extract<SpacingKeys, "md" | "lg" | "xl" | "xl2" | "xl3" | "xl4">,
  Extract<FontSizeKeys, "xs2" | "xs" | "sm" | "md" | "lg">
> = {
  md: "xs2",
  lg: "xs2",
  xl: "xs",
  xl2: "sm",
  xl3: "md",
  xl4: "lg",
};
