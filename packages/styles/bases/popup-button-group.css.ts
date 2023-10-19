import { style, styleVariants } from "@vanilla-extract/css";
import { THEME, SPACING_MAP } from "@wizleap-inc/wiz-ui-constants";

export const popupButtonGroupStyle = style({
  background: THEME.color.white["800"],
  boxSizing: "border-box",
  maxHeight: "25rem",
});

export const popupButtonGroupDisabledCursorStyle = style({
  cursor: "not-allowed",
});

export const borderRadiusStyle = styleVariants(SPACING_MAP, (borderRadius) => ({
  borderRadius,
}));

export const popupButtonGroupButtonBaseStyle = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: THEME.spacing.xs,
  paddingBottom: THEME.spacing.xs,
  fontSize: THEME.fontSize.sm,
  boxSizing: "border-box",
  userSelect: "none",
  gap: THEME.spacing.xs2,
});

export const popupButtonGroupButtonVariantStyle = styleVariants({
  enabled: {
    color: THEME.color.gray["700"],
    cursor: "pointer",
    "@media": {
      "(any-hover: hover)": {
        ":hover": {
          color: THEME.color.green["800"],
          background: THEME.color.green["300"],
        },
      },
    },
    ":active": {
      color: THEME.color.white["800"],
      background: THEME.color.green["800"],
    },
  },
  disabled: {
    color: THEME.color.gray["400"],
  },
});

export const popupButtonGroupTitleBaseStyle = style({
  width: "100%",
  display: "flex",
  fontWeight: THEME.fontWeight.bold,
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.fontSize.xl,
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: THEME.spacing.xs,
  paddingBottom: THEME.spacing.xs,
  boxSizing: "border-box",
  userSelect: "none",
});

export const popupButtonGroupTitleVariantStyle = styleVariants({
  enabled: {
    color: THEME.color.gray["700"],
  },
  disabled: {
    color: THEME.color.gray["400"],
  },
});

export const popupButtonGroupDividerStyle = style({
  height: "1px",
  border: "none",
  margin: "0 0",
  backgroundColor: THEME.color.gray[300],
});

export const popupButtonGroupInnerContainerStyle = style({
  lineHeight: "130%",
  gap: THEME.spacing.xs2,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flex: "none",
});
export const popupButtonGroupInnerContainerLabel = style({
  paddingRight: THEME.spacing.xs,
});
