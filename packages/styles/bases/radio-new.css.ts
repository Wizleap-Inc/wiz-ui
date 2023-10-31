import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const labelBaseStyle = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: THEME.spacing.xs,
  color: THEME.color.gray[800],
  cursor: "pointer",
});

export const labelStyle = styleVariants({
  default: [
    labelBaseStyle,
    {
      color: THEME.color.gray[800],
      cursor: "pointer",
    },
  ],
  disabled: [
    labelBaseStyle,
    {
      color: THEME.color.gray[500],
      cursor: "not-allows",
    },
  ],
});

export const strikeThroughStyle = style({
  textDecoration: "line-through",
});

const borderedBorderWidth = 1;

export const borderedBaseStyle = style({
  borderWidth: `${borderedBorderWidth}px`,
  borderStyle: "solid",
  borderRadius: "4px",
  paddingBlock: THEME.spacing.xs,
  paddingInline: THEME.spacing.md,
  lineHeight: `calc(${THEME.fontSize.xl3} - (${borderedBorderWidth}px * 2))`,
  backgroundColor: THEME.color.white[800],
});

export const borderedStyle = styleVariants({
  default: [
    borderedBaseStyle,
    {
      borderColor: THEME.color.gray[400],
    },
  ],
  checked: [
    borderedBaseStyle,
    {
      borderColor: THEME.color.green[800],
    },
  ],
  error: [
    borderedBaseStyle,
    {
      borderColor: THEME.color.red[800],
    },
  ],
  disabled: [
    borderedBaseStyle,
    {
      borderColor: THEME.color.gray[400],
      backgroundColor: THEME.color.gray[300],
    },
  ],
});

const inputShapeStyle = style({
  height: THEME.fontSize.md,
  width: THEME.fontSize.md,
  borderRadius: THEME.spacing.max,
});

export const inputStyle = style([
  inputShapeStyle,
  {
    position: "absolute",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    margin: 0,
    padding: 0,
  },
]);

export const markerStyle = style([
  inputShapeStyle,
  {
    flexShrink: 0,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: THEME.color.gray[500],
    boxSizing: "border-box",
    padding: "2px",
    backgroundColor: THEME.color.white[800],
    selectors: {
      [`${inputStyle}:checked:not(:disabled) + &`]: {
        borderColor: THEME.color.green[800],
      },
      [`${inputStyle}:disabled + &`]: {
        backgroundColor: THEME.color.gray[300],
      },
      [`${inputStyle}:checked + &::before`]: {
        content: "",
        display: "block",
        width: "100%",
        height: "100%",
        borderRadius: THEME.spacing.max,
        backgroundColor: THEME.color.green[800],
      },
      [`${inputStyle}:disabled:checked + &::before`]: {
        backgroundColor: THEME.color.gray[500],
      },
    },
  },
]);
