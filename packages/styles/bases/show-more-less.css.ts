import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const showMoreLessDetailsStyle = style({
  borderRadius: THEME.spacing.xs,
  background: THEME.color.white[800],
});

export const showMoreLessMessageStyle = style({
  fontWeight: THEME.fontWeight.normal,
  fontSize: THEME.fontSize.sm,
  lineHeight: "130%",
  alignItems: "center",
  display: "flex",
  background: "transparent",
});

const summaryBaseStyle = style({
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  userSelect: "none",
  borderRadius: THEME.spacing.xs,
});

export const showMoreLessSummaryStyle = styleVariants({
  mobile: [
    summaryBaseStyle,
    {
      height: "2.75rem",
      background: THEME.color.gray[200],
      color: THEME.color.green[800],
      fill: THEME.color.green[800],
    },
  ],
  pc: [
    summaryBaseStyle,
    {
      height: THEME.spacing.xl,
      background: THEME.color.white[800],
      color: THEME.color.gray[600],
      fill: THEME.color.gray[600],
      "@media": {
        "(any-hover: hover)": {
          ":hover": {
            background: THEME.color.gray[200],
            color: THEME.color.green[800],
            fill: THEME.color.green[800],
          },
        },
      },
    },
  ],
});

export const showMoreLessContentStyle = style({
  overflow: "hidden",
  maxHeight: 0,
  transition: "max-height 0.4s ease-in-out",
});

export const showMoreLessExpandIconStyle = style({
  transition: "0.4s",
});

export const showMoreLessRotateIconStyle = style({
  transform: "rotate(180deg)",
});
