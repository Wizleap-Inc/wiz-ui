import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const snackbarStyle = style({
  maxWidth: "300px",
  width: "fit-content",
  backgroundColor: THEME.color.green["800"],
  borderRadius: THEME.spacing.xs2,
  transitionDuration: "0.2s",
  boxShadow: THEME.shadow.sm,
});

export const snackbarFixedStyle = style({
  position: "fixed",
});

export const snackbarContainerStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: THEME.spacing.sm,
  padding: `${THEME.spacing.sm} ${THEME.spacing.md}`,
});

export const snackbarHiddenStyle = style({
  opacity: 0,
  visibility: "hidden",
  transform: "translateY(50%)",
});

export const snackbarMessageStyle = style({
  width: "100%",
  textAlign: "left",
});

export const snackbarCloseButtonStyle = style({
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
});

export const snackbarControllerStyle = style({
  position: "fixed",
  bottom: THEME.spacing.md,
  left: THEME.spacing.md,
  display: "flex",
  flexDirection: "column",
  gap: THEME.spacing.md,
  zIndex: THEME.zIndex.floating,
});
