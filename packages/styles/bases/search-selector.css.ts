import { style, styleVariants } from "@vanilla-extract/css";
import { SPACING_MAP, THEME } from "@wizleap-inc/wiz-ui-constants";
export const selectBoxStyle = style({
  position: "relative",
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
});

export const selectBoxDisabledStyle = style({
  opacity: 0.5,
  color: THEME.color.gray[700],
  backgroundColor: THEME.color.gray[300],
});

export const selectBoxCursorStyle = styleVariants({
  default: {
    cursor: "text",
  },
  singleSelected: {
    cursor: "pointer",
  },
  disabled: {
    cursor: "not-allowed",
  },
});

const BORDER_SIZE = "1px";

export const selectBoxInnerBoxStyle = style({
  height: "100%",
  padding: `calc(${THEME.spacing.xs} - ${BORDER_SIZE}) ${THEME.spacing.xs}`,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["500"],
  width: "100%",
  boxSizing: "border-box",
  display: "inline-block",
});

export const selectBoxInnerBoxSelectedItemStyle = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  display: "flex",
  flexDirection: "row",
  float: "left",
  alignItems: "center",
  padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
  gap: THEME.spacing.xs,

  background: THEME.color.gray["300"],
  border: `1px solid ${THEME.color.gray["400"]}`,
  borderRadius: THEME.spacing.xs2,

  color: THEME.color.gray["800"],
});

export const selectBoxInnerBoxSelectedLabelStyle = style({
  lineHeight: THEME.fontSize.lg,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  userSelect: "none",
});

export const selectBoxInnerBoxCloseStyle = style({
  fill: THEME.color.gray["500"],
  fontSize: THEME.spacing.xs,
});

export const selectBoxInnerBoxCloseButtonStyle = style({
  border: "none",
  background: "none",
  padding: 0,
  cursor: "pointer",
  ":disabled": {
    cursor: "not-allowed",
  },
});

export const selectBoxInnerBoxLessStyle = style({
  fill: THEME.color.green["800"],
  fontSize: THEME.spacing.xl,
});

export const selectBoxInnerBoxMoreStyle = style({
  fill: THEME.color.gray["500"],
  fontSize: THEME.spacing.xl,
});

export const selectBoxSelectorStyle = style({
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
  maxHeight: "25rem",
  overflowY: "auto",
});

export const selectBoxSelectorOptionStyle = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${THEME.spacing.xs} ${THEME.spacing.xs2}`,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["800"],
  boxSizing: "border-box",
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
});

export const selectBoxSelectorOptionLabelStyle = style({
  lineHeight: "130%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const selectBoxSearchInputStyle = style({
  width: 0,
  minWidth: "30%",
  border: "none",
  outline: "none",
  padding: `${THEME.spacing.xs2} ${THEME.spacing.no}`,
  lineHeight: THEME.fontSize.xl,
  flexGrow: 1,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["800"],
  "::placeholder": {
    color: THEME.color.gray["500"],
    userSelect: "none",
  },
  ":disabled": {
    cursor: "not-allowed",
    backgroundColor: THEME.color.gray["300"],
  },
  selectors: {
    "&:disabled::placeholder": {
      color: THEME.color.gray[700],
    },
  },
});

export const selectBoxAddStyle = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flex: "none",
});

export const selectBoxExpandIconStyle = style({
  position: "absolute",
  right: THEME.spacing.xs,
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
  ":disabled": {
    cursor: "not-allowed",
  },
});

// ====================================================
// PopupButtonGroup
// ====================================================
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
  padding: THEME.spacing.xs,
  fontSize: THEME.fontSize.sm,
  boxSizing: "border-box",
  userSelect: "none",
  gap: THEME.spacing.xs2,
});

export const popupButtonGroupButtonVariantStyle = styleVariants({
  enabled: {
    color: THEME.color.gray["800"],
    cursor: "pointer",
    "@media": {
      "(any-hover: hover)": {
        ":hover": {
          background: THEME.color.green["300"],
        },
        ":active": {
          color: THEME.color.white["800"],
          background: THEME.color.green["800"],
        },
      },
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
    color: THEME.color.gray["800"],
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
  lineHeight: THEME.fontSize.xl,
  gap: THEME.spacing.xs2,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flex: "none",
});
export const popupButtonGroupInnerContainerLabel = style({
  paddingRight: THEME.spacing.xs,
});
