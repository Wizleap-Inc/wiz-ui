import { style, styleVariants } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const panelSwitchStyle = style({
  display: "flex",
  width: "max-content",
  backgroundColor: THEME.color.gray["200"],
  borderRadius: THEME.spacing.xs2,
});

export const panelSwitchBlockStyle = style({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: `${THEME.spacing.xs} ${THEME.spacing.sm}`,
  fontSize: THEME.fontSize.xs,
  borderTop: `1px solid ${THEME.color.gray["400"]}`,
  borderBottom: `1px solid ${THEME.color.gray["400"]}`,
  cursor: "pointer",
});

export const panelSwitchBlockActiveStyle = style({
  backgroundColor: THEME.color.green["800"],
});

export const panelSwitchBlockDividerStyle = style({
  borderRight: `1px solid ${THEME.color.gray["400"]}`,
});

export const panelSwitchBlockLeftStyle = style({
  borderTop: `1px solid ${THEME.color.gray["400"]}`,
  borderBottom: `1px solid ${THEME.color.gray["400"]}`,
  borderLeft: `1px solid ${THEME.color.gray["400"]}`,
  borderTopLeftRadius: THEME.spacing.xs2,
  borderBottomLeftRadius: THEME.spacing.xs2,
});

export const panelSwitchBlockRightStyle = style({
  borderTop: `1px solid ${THEME.color.gray["400"]}`,
  borderBottom: `1px solid ${THEME.color.gray["400"]}`,
  borderRight: `1px solid ${THEME.color.gray["400"]}`,
  borderTopRightRadius: THEME.spacing.xs2,
  borderBottomRightRadius: THEME.spacing.xs2,
});

export const panelSwitchBlockColorStyle = styleVariants({
  default: {
    color: THEME.color.gray["700"],
  },
  active: {
    color: THEME.color.white["800"],
  },
});

export const panelSwitchInputStyle = style({
  display: "none",
});
