import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const AccordionDetailsStyle = styleVariants({
  white: {
    borderRadius: THEME.spacing.xs,
    backgroundColor: THEME.color.white[800],
  },
  gray: {
    borderRadius: THEME.spacing.xs,
    backgroundColor: THEME.color.gray[300],
  },
});

export const AccordionMessageVariantStyle = styleVariants({
  white: {
    color: THEME.color.gray[600],
    fontWeight: THEME.fontWeight.normal,
    fontSize: THEME.fontSize.sm,
    lineHeight: "130%",
    alignItems: "center",
  },
  gray: {
    color: THEME.color.green[800],
    fontWeight: THEME.fontWeight.normal,
    fontSize: THEME.fontSize.sm,
    lineHeight: "130%",
    alignItems: "center",
  },
});

export const AccordionSummaryStyle = style({
  display: "flex",
  justifyContent: "center",
});

export const AccordionContentStyle = style({
  overflow: "hidden",
});

const openRotate = keyframes({
  "0%": { transform: "rotate(180deg)" },
  "100%": { transform: "rotate(0deg)" },
});

const closeRotate = keyframes({
  "0%": { transform: "rotate(-180deg)" },
  "100%": { transform: "rotate(0deg)" },
});

export const openSpin = style({
  animationName: openRotate,
  animationDuration: "0.4s",
});

export const closeSpin = style({
  animationName: closeRotate,
  animationDuration: "0.4s",
});
