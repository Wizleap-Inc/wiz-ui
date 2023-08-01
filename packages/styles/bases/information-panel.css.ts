import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const informationPanelStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: `${THEME.spacing.md} ${THEME.spacing.xl}`,
  gap: THEME.spacing.xs,
  background: THEME.color.white["800"],
  borderRadius: THEME.spacing.xs2,
});

export const informationPanelBorderStyle = style({
  border: `1px solid ${THEME.color.gray["400"]}`,
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
