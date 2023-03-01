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
  padding: `${THEME.spacing.xs} ${THEME.spacing.xs}`,
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

  color: THEME.color.gray["700"],
});

export const selectBoxInnerBoxSelectedLabelStyle = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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

export const selectBoxSearchInputStyle = style({
  width: "fit-content",
  border: "none",
  outline: "none",
  lineHeight: THEME.fontSize.lg,
  padding: `${THEME.spacing.xs2} ${THEME.spacing.no}`, //THEME.spacing.no,
  flexGrow: 0,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["500"],
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
});
