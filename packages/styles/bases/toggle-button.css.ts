import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const toggleButtonStyle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  width: "fit-content",
  border: "none",
  fontWeight: "bold",
  padding: `${THEME.spacing.xs} ${THEME.spacing.md}`,
  borderRadius: THEME.spacing.xs2,
  fontSize: THEME.fontSize.sm,
  background: THEME.color.white[800],
  boxShadow: THEME.shadow.sm,
  color: THEME.color.green[800],
  selectors: {
    "&:hover:not(:disabled)": {
      opacity: 0.9,
    },
  },
});

const BORDER_WIDTH = "1px";

export const toggleButtonActiveStyle = style({
  background: THEME.color.green[300],
  boxShadow: THEME.shadow.none,
  borderWidth: BORDER_WIDTH,
  borderStyle: "solid",
  borderColor: THEME.color.gray[400],
  padding: `calc(${THEME.spacing.xs} - ${BORDER_WIDTH}) calc(${THEME.spacing.md} - ${BORDER_WIDTH})`,
});

export const toggleButtonDisabledStyle = style({
  opacity: 0.5,
  cursor: "not-allowed",
});

export const toggleButtonRoundedStyle = style({
  borderRadius: THEME.spacing.max,
});
