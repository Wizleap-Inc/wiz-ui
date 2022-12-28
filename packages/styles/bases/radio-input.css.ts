import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const borderWidth = "1px";

export const radioStyle = style({
  width: "fit-content",
});

export const radioInputStyle = style({
  position: "absolute",
  opacity: 0,
  cursor: "pointer",
});

export const radioLabelStyle = style({
  display: "flex",
  alignItems: "center",
  gap: THEME.spacing.sm,
  ":before": {
    content: "",
    background: THEME.color.white["800"],
    border: `${borderWidth} solid ${THEME.color.gray["400"]}`,
    borderRadius: THEME.spacing.max,
    width: THEME.spacing.md,
    height: THEME.spacing.md,
    boxSizing: "border-box",
    display: "inline-block",
  },
});

export const radioLabelCheckedStyle = style({
  position: "relative",
  ":before": {
    border: `${borderWidth} solid ${THEME.color.green["800"]}`,
  },
  ":after": {
    position: "absolute",
    content: "",
    width: THEME.spacing.xs,
    height: THEME.spacing.xs,
    left: THEME.spacing.xs2,
    background: THEME.color.green["800"],
    borderRadius: THEME.spacing.max,
  },
});

export const radioLabelDisabledStyle = style({
  opacity: 0.5,
});

export const radioLabelColorStyle = styleVariants({
  default: {
    color: THEME.color.gray["600"],
  },
  checked: {
    color: THEME.color.green["800"],
  },
});

export const radioLabelCursorStyle = styleVariants({
  default: {
    cursor: "pointer",
  },
  disabled: {
    cursor: "not-allowed",
  },
});
