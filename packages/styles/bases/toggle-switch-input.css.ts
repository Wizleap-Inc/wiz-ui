import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

const borderWidth = "1px";
const switchWidth = THEME.spacing.xl3;
const switchHeight = THEME.spacing.lg;

export const toggleSwitchStyle = style({
  position: "relative",
  display: "inline-block",
  width: switchWidth,
  height: switchHeight,
});

export const toggleSwitchInputStyle = style({
  opacity: 0,
  width: 0,
  height: 0,
});

export const toggleSwitchSliderStyle = style({
  position: "absolute",
  cursor: "pointer",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: THEME.color.white["800"],
  border: `${borderWidth} solid ${THEME.color.green["800"]}`,
  borderRadius: THEME.spacing.xl,
  boxSizing: "border-box",
  ":before": {
    position: "absolute",
    content: '""',
    height: `calc(${switchWidth} / 3)`,
    width: `calc(${switchWidth} / 3)`,
    top: `calc((${switchHeight} - ${borderWidth} * 2 - calc(${switchWidth} / 3)) / 2)`,
    left: THEME.spacing.xs2,
    backgroundColor: THEME.color.green["800"],
    borderRadius: THEME.spacing.max,
    transition: "0.4s",
  },
});

export const toggleSwitchSliderCheckedStyle = style({
  ":before": {
    WebkitTransform: `translateX(calc(${switchWidth} - calc((${THEME.spacing.xs2} + ${borderWidth}) * 2) - calc(${switchWidth} / 3)))`,
    msTransform: `translateX(calc(${switchWidth} - calc((${THEME.spacing.xs2} + ${borderWidth}) * 2) - calc(${switchWidth} / 3)))`,
    transform: `translateX(calc(${switchWidth} - calc((${THEME.spacing.xs2} + ${borderWidth}) * 2) - calc(${switchWidth} / 3)))`,
  },
});
