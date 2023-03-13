import { style, styleVariants } from "@vanilla-extract/css";
import { THEME, SPACING_MAP } from "@wizleap-inc/wiz-ui-constants";

export const popupButtonGroupStyle = style({
  background: THEME.color.white["800"],
  boxSizing: "border-box",
  maxHeight: "25rem",
});

export const borderRadiusStyle = styleVariants(SPACING_MAP, (borderRadius) => ({
  borderRadius,
}));

export const popupButtonGroupButtonStyle = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: THEME.spacing.xs,
  paddingBottom: THEME.spacing.xs,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["700"],
  boxSizing: "border-box",
  cursor: "pointer",
  ":hover": {
    color: THEME.color.green["800"],
    background: THEME.color.green["300"],
  },
  ":active": {
    color: THEME.color.white["800"],
    background: THEME.color.green["800"],
  },
  userSelect: "none",
});

export const popupButtonGroupTitleStyle = style({
  width: "100%",
  display: "flex",
  fontWeight: THEME.fontWeight.bold,
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.fontSize.xl,
  color: THEME.color.gray["700"],

  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: THEME.spacing.xs,
  paddingBottom: THEME.spacing.xs,
  boxSizing: "border-box",
  userSelect: "none",
});

export const popupButtonGroupDividerStyle = style({
  height: "1px",
  border: "none",
  margin: "0 0",
  backgroundColor: THEME.color.gray[300],
});
