import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const borderWidth = "1px";
const focusedBorderWidth = "2px";

export const checkboxStyle = style({
  width: "fit-content",
  lineHeight: "100%",
});

export const checkboxInputStyle = style({
  cursor: "pointer",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  position: "absolute",
});

export const checkboxLabelStyle = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  color: THEME.color.gray["800"],
  fontSize: THEME.fontSize.sm,
  gap: THEME.spacing.sm,
  userSelect: "none",
});

export const checkboxLabelCheckedStyle = style({
  ":before": {
    border: `${borderWidth} solid ${THEME.color.green["800"]}`,
  },
});

export const checkboxLabelDisabledStyle = style({
  opacity: 0.5,
});

export const checkboxLabelStrikeThrough = style({
  textDecorationLine: "line-through",
});

export const checkboxLabelCursorStyle = styleVariants({
  default: {
    cursor: "pointer",
  },
  disabled: {
    cursor: "not-allowed",
  },
});

export const checkboxIconBaseStyle = style({
  boxSizing: "border-box",
  fill: THEME.color.transparent,
  fontSize: THEME.fontSize.md,
  borderRadius: `calc(${THEME.spacing.xs2} / 2)`,
});

export const checkboxIconVariantStyle = styleVariants({
  default: {
    border: `${borderWidth} solid ${THEME.color.gray["600"]}`,
  },
  checked: {
    fill: THEME.color.green["800"],
    border: `${borderWidth} solid ${THEME.color.green["800"]}`,
  },
});

export const checkboxIconContainerStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

export const checkboxIconFocusedColorStyle = styleVariants({
  default: {
    outline: `${focusedBorderWidth} solid ${THEME.color.gray[600]}`,
  },
  checked: {
    fill: THEME.color.green["800"],
    outline: `${focusedBorderWidth} solid ${THEME.color.green["800"]}`,
  },
});

export const checkboxBlockCheckedStyle = style({
  color: THEME.color.green["800"],
});
