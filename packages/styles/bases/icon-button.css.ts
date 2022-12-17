import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const baseIconButtonStyle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer",
});

const BORDER_WIDTH = "1px";

export const iconButtonStyle = styleVariants({
  primary: [
    baseIconButtonStyle,
    {
      padding: THEME.spacing.xs,
      boxShadow: THEME.shadow.md,
      background: THEME.color.gradient,
      border: "none",
      selectors: {
        "&:hover:not(:disabled)": {
          opacity: 0.9,
        },
      },
    },
  ],
  sub: [
    baseIconButtonStyle,
    {
      background: THEME.color.white[800],
      borderWidth: BORDER_WIDTH,
      borderStyle: "solid",
      borderColor: THEME.color.gray[400],
      padding: `calc(${THEME.spacing.xs} - ${BORDER_WIDTH})`,
      selectors: {
        "&:hover:not(:disabled)": {
          background: THEME.color.gray[300],
        },
      },
    },
  ],
  transparent: [
    baseIconButtonStyle,
    {
      background: "none",
      border: "none",
      padding: 0,
    },
  ],
  link: [
    baseIconButtonStyle,
    {
      background: "none",
      border: "none",
      padding: 0,
    },
  ],
});

export const iconButtonDisabledStyle = style({
  cursor: "not-allowed",
  opacity: 0.5,
});

export const iconButtonSVGStyle = styleVariants({
  primary: {
    fill: THEME.color.white[800],
  },
  sub: {
    fill: THEME.color.green[800],
  },
  transparent: {
    fill: THEME.color.gray[700],
  },
  link: {
    fill: THEME.color.blue[800],
  },
});
