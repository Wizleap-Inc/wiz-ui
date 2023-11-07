import { style, styleVariants } from "@vanilla-extract/css";
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

const baseToggleSwitchSliderStyle = style({
  position: "absolute",
  cursor: "pointer",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: THEME.spacing.xl,
  boxSizing: "border-box",
  transition: "0.4s",
  ":before": {
    backgroundColor: THEME.color.white[800],
    position: "absolute",
    content: '""',
    height: `calc(${switchHeight} - ${borderWidth} * 2)`, // 高さを調整
    width: `calc(${switchHeight} - ${borderWidth} * 2)`, // 幅を調整
    top: `calc(50% - (${switchHeight} - ${borderWidth} * 2) / 2)`, // 中央に来るように調整
    left: borderWidth,
    borderRadius: THEME.spacing.max,
    transition: "0.4s",
  },
});

export const toggleSwitchSliderStyle = styleVariants({
  default: [baseToggleSwitchSliderStyle],
  checked: [
    baseToggleSwitchSliderStyle,
    {
      ":before": {
        WebkitTransform: `translateX(calc(100% + ${borderWidth} * 2))`,
        msTransform: `translateX(calc(100% + ${borderWidth} * 2))`,
        transform: `translateX(calc(100% + ${borderWidth} * 2))`,
      },
    },
  ],
});

export const toggleSwitchColorStyle = styleVariants({
  default: {
    backgroundColor: THEME.color.gray[500],
  },
  checked: {
    backgroundColor: THEME.color.green[800],
  },
});

export const toggleSwitchDisabledColorStyle = styleVariants({
  default: {
    backgroundColor: THEME.color.gray[400],
    cursor: "not-allowed",
  },
  checked: {
    backgroundColor: THEME.color.green[500],
    cursor: "not-allowed",
  },
});
