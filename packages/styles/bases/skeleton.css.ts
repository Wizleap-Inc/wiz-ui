import {
  style,
  keyframes,
  styleVariants,
  globalStyle,
} from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const skeletonAnimation = keyframes({
  "0%": {
    backgroundPosition: "100% 50%",
  },
  "100%": {
    backgroundPosition: "0% 50%",
  },
});

export const skeletonStyle = style({
  background: `linear-gradient(90deg, ${THEME.color.gray[300]} 30%, ${THEME.color.white[800]} 50%, ${THEME.color.gray[300]} 70%)`,
  backgroundSize: "400% 400%",
  animation: `${skeletonAnimation} 1.2s ease-in-out infinite`,
  userSelect: "none",
});

globalStyle(`${skeletonStyle} *`, {
  pointerEvents: "none",
  visibility: "hidden",
});

export const normalSkeletonStyle = style({
  borderRadius: THEME.spacing.xs2,
});

export const textSkeletonStyle = styleVariants({
  last: {
    width: "80%",
  },
  noLast: {
    width: "100%",
  },
});

export const circleSkeletonStyle = style({
  borderRadius: "50%",
});
