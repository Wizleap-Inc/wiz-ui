import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/stack.css";
import {
  gapStyle,
  gapXStyle,
  gapYStyle,
  marginStyle,
  marginXStyle,
  marginYStyle,
  marginTopStyle,
  marginRightStyle,
  marginBottomStyle,
  marginLeftStyle,
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
  paddingTopStyle,
  paddingRightStyle,
  paddingBottomStyle,
  paddingLeftStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { ReactNode, memo } from "react";

export type Props = {
  direction?: "horizontal" | "vertical";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: SpacingKeys;
  gx?: SpacingKeys;
  gy?: SpacingKeys;
  p?: SpacingKeys;
  pt?: SpacingKeys;
  pr?: SpacingKeys;
  pb?: SpacingKeys;
  pl?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  m?: SpacingKeys;
  mt?: SpacingKeys;
  mr?: SpacingKeys;
  mb?: SpacingKeys;
  ml?: SpacingKeys;
  mx?: SpacingKeys;
  my?: SpacingKeys;
  width?: string;
  height?: string;
  overflow?: string;
  reverse?: string;
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static";
  children?: ReactNode;
};

const _Stack = ({
  direction = "horizontal",
  align = "stretch",
  justify = "start",
  wrap = true,
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
  reverse,
  position,
  ...props
}: Props) => {
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
  const stackStyle = `
    ${styles.stackStyle}
    ${styles.stackDirectionStyle[dir]}
    ${styles.stackJustifyStyle[justify]}
    ${styles.stackAlignStyle[align]}
    ${position && styles.stackPositionStyle[position]}
    ${wrap && styles.stackWrapStyle}
    ${gx && gapXStyle[gx]}
    ${gy && gapYStyle[gy]}
    ${!gx && !gy && gap && gapStyle[gap]}
    ${mx && marginXStyle[mx]}
    ${my && marginYStyle[my]}
    ${!mx && !my && m && marginStyle[m]}
    ${mt && marginTopStyle[mt]}
    ${mr && marginRightStyle[mr]}
    ${mb && marginBottomStyle[mb]}
    ${ml && marginLeftStyle[ml]}
    ${px && paddingXStyle[px]}
    ${py && paddingYStyle[py]}
    ${!px && !py && p && paddingStyle[p]}
    ${pt && paddingTopStyle[pt]}
    ${pr && paddingRightStyle[pr]}
    ${pb && paddingBottomStyle[pb]}
    ${pl && paddingLeftStyle[pl]}
  `;

  return (
    <div className={stackStyle} style={{ width, height, overflow }}>
      {props.children}
    </div>
  );
};

export const WizStack = memo(_Stack);
