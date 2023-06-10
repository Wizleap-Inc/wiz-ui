import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const messageBoxStyle = style({
  display: "flex",
  height: "max-content",
  padding: `${THEME.spacing.xs} ${THEME.spacing.md}`,
  boxSizing: "border-box",
});

export const messageBoxVariantStyle = styleVariants({
  information: {
    backgroundColor: THEME.color.green[300],
    border: `1px solid ${THEME.color.green[800]}`,
    borderRadius: THEME.spacing.xs2,
  },
  caution: {
    backgroundColor: THEME.color.yellow[300],
    border: `1px solid ${THEME.color.yellow[800]}`,
    borderRadius: THEME.spacing.xs2,
  },
  warning: {
    backgroundColor: THEME.color.red[300],
    border: `1px solid ${THEME.color.red[800]}`,
    borderRadius: THEME.spacing.xs2,
  },
});

export const messageBoxWidthStyle = styleVariants({
  default: {
    width: "max-content",
  },
  expand: {
    width: "100%",
  },
  short: {
    width: "max-content",
    minWidth: "12.5rem",
  },
});

export const messageBoxIconStyle = style({
  fontSize: THEME.fontSize.xl2,
  minWidth: THEME.fontSize.xl2,
  marginRight: THEME.spacing.sm,
});

export const messageBoxIconFillStyle = styleVariants({
  information: {
    fill: THEME.color.green[800],
  },
  caution: {
    fill: THEME.color.yellow[800],
  },
  warning: {
    fill: THEME.color.red[800],
  },
});

export const messageBoxTitleStyle = style({
  fontWeight: 700,
  fontSize: THEME.fontSize.xs,
  lineHeight: THEME.fontSize.xl2,
  color: THEME.color.gray[700],
});
export const messageBoxSlotStyle = style({
  marginBottom: THEME.spacing.xs,
  fontSize: THEME.fontSize.xs,
  color: THEME.color.gray[700],
});
