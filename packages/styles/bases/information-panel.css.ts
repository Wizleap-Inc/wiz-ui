import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const informationPanelStye = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: `${THEME.spacing.lg} ${THEME.spacing.md}`,
  gap: THEME.spacing.xs,
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
});

export const informationPanelMessageStyle = style({
  margin: `${THEME.spacing.xs} 0`,
});

export const informationPanelFontStyle = styleVariants({
  default: {
    fontSize: THEME.fontSize.sm,
    color: THEME.color.gray["700"],
  },
  error: {
    fontSize: THEME.fontSize.sm,
    color: THEME.color.red["800"],
  },
});

export const informationPanelIconStyle = style({
  margin: "auto 0",
});
