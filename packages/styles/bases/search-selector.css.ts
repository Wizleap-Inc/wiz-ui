import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";
export const selectBoxStyle = style({
  position: "relative",
  height: THEME.spacing.xl3,
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
  boxSizing: "border-box",
});

export const selectBoxDisabledStyle = style({
  color: THEME.color.gray["700"],
  backgroundColor: THEME.color.gray["300"],
});

export const selectBoxCursorStyle = styleVariants({
  default: {
    cursor: "pointer",
  },
  disabled: {
    cursor: "not-allowed",
  },
});

export const selectBoxInnerBoxStyle = style({
  height: "100%",
  padding: `${THEME.spacing.no} ${THEME.spacing.xs}`,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["500"],
  width: "100%",
  boxSizing: "border-box",
});

export const selectBoxInnerBoxSelectedValueStyle = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: `${THEME.spacing.xs2} ${THEME.spacing.xs}`,
  gap: THEME.spacing.xs,

  background: THEME.color.gray["300"],
  border: `1px solid ${THEME.color.gray["400"]}`,
  borderRadius: THEME.spacing.xs2,

  color: THEME.color.gray["700"],

  flex: "none",
});

export const selectBoxInnerBoxCloseStyle = style({
  fill: THEME.color.gray["500"],
  fontSize: THEME.spacing.xs,
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
  padding: THEME.spacing.xs,
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
});

export const selectBoxPlaceholderStyle = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const selectBoxSearchInputStyle = style({
  border: "none",
  outline: "none",
  padding: 0,
  flexGrow: 1,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["500"],
});

export const selectBoxAddStyle = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flex: "none",
});
