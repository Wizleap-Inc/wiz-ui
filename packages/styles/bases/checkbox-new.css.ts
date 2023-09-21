import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const labelBaseStyle = style({
  display: "inline-flex",
  alignItems: "center",
  gap: THEME.spacing.xs,
  fontSize: THEME.fontSize.sm,
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
      cursor: "not-allowed",
    },
  ],
});

export const strikeThroughStyle = style({
  textDecorationLine: "line-through",
});

const borderedBaseStyle = style({
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "4px",
  paddingBlock: THEME.spacing.xs,
  paddingInline: THEME.spacing.md,
  lineHeight: THEME.fontSize.xl2,
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
  borderRadius: "2px",
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

export const iconWrapperStyle = style([
  inputShapeStyle,
  {
    height: THEME.fontSize.md,
    width: THEME.fontSize.md,
    borderRadius: "2px",
    boxSizing: "border-box",
    selectors: {
      [`${inputStyle}:not(:checked) + &`]: {
        border: `1px solid ${THEME.color.gray[500]}`,
      },
      [`${inputStyle}:checked:not(:disabled) + &`]: {
        backgroundColor: THEME.color.green[800],
      },
      [`${inputStyle}:checked:disabled + &`]: {
        backgroundColor: THEME.color.gray[400],
      },
    },
  },
]);
