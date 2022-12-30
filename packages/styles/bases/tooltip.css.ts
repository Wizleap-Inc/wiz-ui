import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const tooltipStyle = style({
  position: "relative",
  width: "fit-content",
});

const TOOLTIP_BLOCK_WIDTH = "220px";

export const tooltipBlockStyle = style({
  transition: "opacity 100ms",
  position: "absolute",
  textAlign: "center",
  zIndex: 10,
  width: TOOLTIP_BLOCK_WIDTH,
  bottom: "140%",
  left: "50%",
  marginLeft: `calc(-1 * ${TOOLTIP_BLOCK_WIDTH} / 2)`,

  selectors: {
    [`${tooltipStyle}:hover > &`]: {
      visibility: "visible",
      opacity: 1,
    },
    [`${tooltipStyle}:not(:hover) > &`]: {
      visibility: "hidden",
      opacity: 0,
    },
  },
});

export const tooltipContentStyle = style({
  backgroundColor: THEME.color.gray[800],
  color: THEME.color.white[800],
  fontSize: THEME.fontSize.xs2,
  borderRadius: THEME.spacing.xs,
  padding: THEME.spacing.xs,
  display: "inline-block",

  "::after": {
    content: "",
    position: "absolute",
    left: "50%",
    top: "95%",
    marginLeft: "-5px",
    borderStyle: "solid",
    borderWidth: "9px 5px 0 5px",
    borderColor: `${THEME.color.gray[800]} transparent transparent transparent`,
  },
});
