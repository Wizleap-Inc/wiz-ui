import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const borderWidth = "1px";
const focusedBorderWidth = "2px";

export const radioStyle = style({
  width: "fit-content",
});

export const radioInputStyle = style({
  position: "absolute",
  opacity: 0,
  cursor: "pointer",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
});

export const radioLabelStyle = style({
  display: "flex",
  alignItems: "center",
  gap: THEME.spacing.sm,
  fontSize: THEME.fontSize.sm,
  lineHeight: "100%",
  userSelect: "none",
  ":before": {
    content: "",
    borderRadius: THEME.spacing.max,
    width: THEME.spacing.md,
    height: THEME.spacing.md,
    boxSizing: "border-box",
    display: "inline-block",
    flexShrink: 0,
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
    borderRadius: THEME.spacing.max,
  },
});

export const radioLabelDisabledStyle = style({
  opacity: 0.5,
});

export const radioLabelStrikeThrough = style({
  textDecorationLine: "line-through",
});

export const radioLabelColorStyle = styleVariants({
  default: {
    color: THEME.color.gray["600"],
    ":before": {
      background: THEME.color.white["800"],
      border: `${borderWidth} solid ${THEME.color.gray["400"]}`,
    },
  },
  focused: {
    color: THEME.color.gray["600"],
    ":before": {
      border: `${focusedBorderWidth} solid ${THEME.color.gray["400"]}`,
    },
  },
  checked: {
    color: THEME.color.green["800"],
    ":before": {
      border: `${borderWidth} solid ${THEME.color.green["800"]}`,
    },
    ":after": {
      background: THEME.color.green["800"],
    },
  },
  checkedFocused: {
    color: THEME.color.green["800"],
    ":before": {
      border: `${focusedBorderWidth} solid ${THEME.color.green["800"]}`,
    },
    ":after": {
      background: THEME.color.green["800"],
    },
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

export const radioBoldOnHoverStyle = style({
  "@media": {
    "(any-hover: hover)": {
      ":hover": {
        fontWeight: THEME.fontWeight.bold,
        textAlign: "right",
      },
    },
  },
});
