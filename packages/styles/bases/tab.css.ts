import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const tabPaneStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: THEME.spacing.xs2,
  height: THEME.spacing.xl3,
  fontSize: THEME.fontSize.sm,
  borderRadius: `${THEME.spacing.xs2} ${THEME.spacing.xs2} 0 0`,
});

export const tabPaneVariantStyle = styleVariants({
  default: {
    cursor: "pointer",
    color: THEME.color.gray[600],
    background: THEME.color.white[500],
  },
  active: {
    background: THEME.color.white[800],
    color: THEME.color.green[800],
    fontWeight: "bold",
  },
  disabled: {
    background: THEME.color.white[800],
    color: THEME.color.gray[600],
    cursor: "not-allowed",
    opacity: 0.5,
  },
});

export const tabPaneLabelStyle = style({
  lineHeight: THEME.fontSize.lg,
});

export const tabPaneNotificationStyle = style({
  lineHeight: THEME.fontSize.lg,
  width: THEME.fontSize.lg,
  height: THEME.fontSize.lg,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: THEME.color.red[800],
  color: THEME.color.white[800],
  fontSize: THEME.fontSize.xs2,
  fontWeight: "normal",
});
