import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const borderWidth = "1px";

export const checkboxStyle = style({
  width: "fit-content",
});

export const checkboxInputStyle = style({
  position: "absolute",
  display: "none",
  cursor: "pointer",
});

export const checkboxLabelStyle = style({
  display: "flex",
  alignItems: "center",
  color: THEME.color.gray["600"],
  fontSize: THEME.fontSize.sm,
  gap: THEME.spacing.sm,
  cursor: "pointer",
  ":before": {
    content: "",
    border: `${borderWidth} solid ${THEME.color.gray["400"]}`,
    borderRadius: `calc(${THEME.spacing.xs2} / 2)`,
    width: THEME.spacing.sm,
    height: THEME.spacing.sm,
    display: "inline-block",
  },
});

export const checkboxLabelCheckedStyle = style({
  position: "relative",
  ":before": {
    border: `${borderWidth} solid ${THEME.color.green["800"]}`,
  },
});

export const checkboxLabelDisabledStyle = style({
  cursor: "not-allowed",
  opacity: 0.5,
});

export const checkboxBlockStyle = style({
  ":before": {
    content: "",
    position: "absolute",
    display: "none",
    height: "1px",
    width: "4px",
    top: "11px",
    left: "2px",
    background: THEME.color.green["800"],
    borderRadius: THEME.spacing.xs2,
    transform: "rotate(45deg)",
  },
  ":after": {
    content: "",
    position: "absolute",
    display: "none",
    height: "1px",
    width: "8px",
    top: "10px",
    left: "4px",
    background: THEME.color.green["800"],
    borderRadius: THEME.spacing.xs2,
    transform: "rotate(-45deg)",
  },
});

export const checkboxBlockCheckedStyle = style({
  color: THEME.color.green["800"],
  ":before": {
    display: "block",
  },
  ":after": {
    display: "block",
  },
});
