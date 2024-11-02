import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const TIMELINES_GAP = "xl2";
/** 隣の要素がタイムラインの要素かどうかを判定するためのクラス名 */
export const TIMELINE_ITEM_IDENTIFIER_CLASS = "timeline-item";

const timelineItemVars = createThemeContract({
  iconCardGap: null,
  iconSize: null,
  iconPadding: null,
  titleFontSize: null,
  dateFontSize: null,
});

export const timelineItemVariant = styleVariants({
  mobile: {
    vars: assignVars(timelineItemVars, {
      iconCardGap: THEME.spacing.xs,
      iconSize: THEME.spacing.xl,
      iconPadding: THEME.spacing.xs2,
      titleFontSize: THEME.fontSize.xs,
      dateFontSize: THEME.fontSize.xs2,
    }),
  },
  pc: {
    vars: assignVars(timelineItemVars, {
      iconCardGap: THEME.spacing.md,
      iconSize: THEME.spacing.xl3,
      iconPadding: THEME.spacing.xs,
      titleFontSize: THEME.fontSize.sm,
      dateFontSize: THEME.fontSize.xs,
    }),
  },
});

export const container = style({
  display: "flex",
  alignItems: "flex-start",
  gap: timelineItemVars.iconCardGap,
  position: "relative",
});

globalStyle(
  `${container}:has(+ ${container}.${TIMELINE_ITEM_IDENTIFIER_CLASS}):before`,
  {
    content: "''",
    position: "absolute",
    display: "block",
    top: `calc(${timelineItemVars.iconSize} / 2)`,
    left: `calc(${timelineItemVars.iconSize} / 2)`,
    width: 4,
    transform: "translateX(-50%)",
    height: `calc(100% + ${THEME.spacing[TIMELINES_GAP]})`,
    backgroundColor: THEME.color.gray[300],
  }
);

export const icon = style({
  boxSizing: "border-box",
  width: timelineItemVars.iconSize,
  height: timelineItemVars.iconSize,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  padding: timelineItemVars.iconPadding,
  zIndex: 1,
});

export const iconVariant = styleVariants({
  success: {
    backgroundColor: THEME.color.green[800],
  },
  failure: {
    backgroundColor: THEME.color.red[800],
  },
  yellow: {
    backgroundColor: THEME.color.yellow[800],
  },
  gray: {
    backgroundColor: THEME.color.gray[500],
  },
});

export const disabled = style({
  pointerEvents: "none",
  userSelect: "none",
  position: "relative",
  overflow: "hidden",

  ":before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: THEME.color.white[500],
    zIndex: 1,
  },
});

export const card = style({
  boxShadow: THEME.shadow.md,
  width: "100%",
  borderRadius: THEME.spacing.xs2,
  overflow: "hidden",
  backgroundColor: THEME.color.white[800],
});

export const contents = style({
  padding: THEME.spacing.md,
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: THEME.spacing.xs,
});

export const headerRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const titleContainer = style({
  display: "inline-flex",
  alignItems: "center",
  gap: THEME.spacing.xs,
});

export const title = style({
  fontSize: timelineItemVars.titleFontSize,
  fontWeight: THEME.fontWeight.bold,
  height: "min-content",
  color: THEME.color.gray[700],
});

export const annotation = style({
  fontSize: timelineItemVars.dateFontSize,
  color: THEME.color.gray[600],
  lineHeight: THEME.fontSize.xl2,
  // no shurink
  flexShrink: 0,
});

export const body = style({
  borderTop: `1px solid ${THEME.color.gray[400]}`,
  paddingTop: THEME.spacing.md,
  marginTop: THEME.spacing.md,
});
