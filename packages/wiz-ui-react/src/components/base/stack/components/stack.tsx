import * as styles from "@wizleap-inc/wiz-ui-styles/bases/stack.css";
import {
  gapStyle,
  gapXStyle,
  gapYStyle,
  marginBottomStyle,
  marginLeftStyle,
  marginRightStyle,
  marginStyle,
  marginTopStyle,
  marginXStyle,
  marginYStyle,
  paddingBottomStyle,
  paddingLeftStyle,
  paddingRightStyle,
  paddingStyle,
  paddingTopStyle,
  paddingXStyle,
  paddingYStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { memo } from "react";

import { StackProps } from "@/components/base/stack/components/types";

const _Stack = ({
  direction = "horizontal",
  align = "stretch",
  justify = "start",
  nowrap = false,
  width = "auto",
  height = "auto",
  overflow = "visible",
  gap,
  gx,
  gy,
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  reverse = false,
  position,
  ...props
}: StackProps) => {
  const dir = (() => {
    switch (direction) {
      case "horizontal": {
        return reverse ? "horizontalReverse" : "horizontal";
      }
      case "vertical": {
        return reverse ? "verticalReverse" : "vertical";
      }
    }
  })();
  const stackStyle = clsx(
    styles.stackStyle,
    styles.stackDirectionStyle[dir],
    styles.stackJustifyStyle[justify],
    styles.stackAlignStyle[align],
    position && styles.stackPositionStyle[position],
    !nowrap && styles.stackWrapStyle,
    gx && gapXStyle[gx],
    gy && gapYStyle[gy],
    !gx && !gy && gap && gapStyle[gap],
    mx && marginXStyle[mx],
    my && marginYStyle[my],
    !mx && !my && m && marginStyle[m],
    mt && marginTopStyle[mt],
    mr && marginRightStyle[mr],
    mb && marginBottomStyle[mb],
    ml && marginLeftStyle[ml],
    px && paddingXStyle[px],
    py && paddingYStyle[py],
    !px && !py && p && paddingStyle[p],
    pt && paddingTopStyle[pt],
    pr && paddingRightStyle[pr],
    pb && paddingBottomStyle[pb],
    pl && paddingLeftStyle[pl]
  );
  return (
    <div
      {...props}
      className={clsx([stackStyle, props.className])}
      style={{ width, height, overflow }}
    >
      {props.children}
    </div>
  );
};

export const WizStack = memo(_Stack);
