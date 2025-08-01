import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const messageBoxStyle = style({
  display: "flex",
  height: "max-content",
  padding: THEME.spacing.md,
  boxSizing: "border-box",
});

export const messageBoxVariantStyle = styleVariants({
  information: {
    backgroundColor: THEME.color.green[300],
    border: `${THEME.borderWidth.xs} solid ${THEME.color.green[800]}`,
    borderRadius: THEME.spacing.xs2,
  },
  caution: {
    backgroundColor: THEME.color.yellow[300],
    border: `${THEME.borderWidth.xs} solid ${THEME.color.yellow[800]}`,
    borderRadius: THEME.spacing.xs2,
  },
  warning: {
    backgroundColor: THEME.color.red[300],
    border: `${THEME.borderWidth.xs} solid ${THEME.color.red[800]}`,
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
});

export const messageBoxShortStyle = style({
  paddingTop: THEME.spacing.xs,
  paddingBottom: THEME.spacing.xs,
});

export const messageBoxIconStyle = style({
  flexShrink: 0,
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
  fontSize: THEME.fontSize.sm,
  lineHeight: THEME.fontSize.xl2,
  color: THEME.color.gray[700],
  textAlign: "left",
});

export const messageBoxBodyStyle = style({
  fontSize: THEME.fontSize.sm,
  color: THEME.color.gray[700],
});
