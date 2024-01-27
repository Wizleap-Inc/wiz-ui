import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const labelBaseStyle = style({
  position: "relative",
  display: "inline-flex",
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

const borderedBorderWidth = 1;

const borderedBaseStyle = style({
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
  borderRadius: "2px",
});

export const inputStyle = style([
  inputShapeStyle,
  {
    position: "absolute",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    padding: 0,
  },
]);

export const iconWrapperStyle = style([
  inputShapeStyle,
  {
    position: "relative",
    height: THEME.fontSize.md,
    width: THEME.fontSize.md,
    flexShrink: 0,
    borderRadius: "2px",
    boxSizing: "border-box",
    backgroundColor: THEME.color.white[800],
    selectors: {
      [`${inputStyle}:not(:checked) + &`]: {
        border: `1px solid ${THEME.color.gray[500]}`,
      },
      [`${inputStyle}:checked:not(:disabled) + &`]: {
        backgroundColor: THEME.color.green[800],
      },
      [`${inputStyle}:disabled + &`]: {
        backgroundColor: THEME.color.gray[300],
      },
      [`${inputStyle}:checked:disabled + &`]: {
        backgroundColor: THEME.color.gray[400],
      },
    },
  },
]);

export const iconPositionStyle = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
