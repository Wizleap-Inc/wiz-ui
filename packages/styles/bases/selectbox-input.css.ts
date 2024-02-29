import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const selectBoxStyle = style({
  position: "relative",
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

const BORDER_WIDTH = "1px";

export const selectBoxInnerBoxStyle = style({
  height: "100%",
  padding: `calc(${THEME.spacing.xs} - ${BORDER_WIDTH}) ${THEME.spacing.xs}`,
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray["500"],
  width: "100%",
  boxSizing: "border-box",
  lineHeight: THEME.fontSize.xl3,
});

export const selectBoxInnerBoxSelectedValueStyle = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: THEME.color.gray["800"],
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
  padding: THEME.spacing.xs,
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.fontSize.xl,
  color: THEME.color.gray["800"],
  boxSizing: "border-box",
  cursor: "pointer",
  "@media": {
    "(any-hover: hover)": {
      ":hover": {
        background: THEME.color.green["300"],
      },
    },
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
