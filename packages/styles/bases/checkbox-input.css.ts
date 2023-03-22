import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const borderWidth = "1px";

export const checkboxStyle = style({
  width: "fit-content",
  lineHeight: "100%",
});

export const checkboxInputStyle = style({
  display: "none",
  cursor: "pointer",
});

export const checkboxLabelStyle = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  color: THEME.color.gray["600"],
  fontSize: THEME.fontSize.sm,
  gap: THEME.spacing.sm,
  ":before": {
    content: "",
    border: `${borderWidth} solid ${THEME.color.gray["400"]}`,
    borderRadius: `calc(${THEME.spacing.xs2} / 2)`,
    width: THEME.spacing.md,
    height: THEME.spacing.md,
    boxSizing: "border-box",
    display: "inline-block",
  },
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

export const checkboxIconStyle = style({
  position: "absolute",
  top: `${borderWidth}`,
  left: `${borderWidth}`,
  fill: THEME.color.green["800"],
});

export const checkboxBlockCheckedStyle = style({
  color: THEME.color.green["800"],
});
