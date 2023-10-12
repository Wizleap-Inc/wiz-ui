import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
  WhiteSpaceKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text.css";
import {
  colorStyle,
  fontSizeStyle,
  lineHeightStyle,
  whiteSpaceStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode, memo } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  as?: "p" | "span" | "label";
  htmlFor?: string;
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  lineHeight?: FontSizeKeys;
  bold?: boolean;
  maxLines?: number;
  whiteSpace?: WhiteSpaceKeys;
  /**
   * テキストをぼかすかどうかを指定します。
   * @default false
   */
  isBlurred?: boolean;
  breakAll?: boolean;
  textAlign?: "start" | "end" | "left" | "right" | "center";
  lineThrough?: boolean;
  display?: "inline" | "inline-block" | "inline-flex";
  children?: ReactNode;
};

const _Text = ({
  className,
  style,
  as = "p",
  htmlFor,
  color = "gray.900",
  fontSize = "md",
  lineHeight,
  bold,
  maxLines,
  whiteSpace = "normal",
  isBlurred = false,
  breakAll,
  textAlign = "start",
  lineThrough = false,
  display,
  children,
}: Props) => {
  const textStyle = maxLines
    ? {
        ...style,
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: maxLines,
      }
    : style;
  const textClass = clsx([
    className,
    styles.textStyle,
    styles.textFontWeightStyle[bold ? "bold" : "default"],
    styles.textAlignStyle[textAlign],
    (maxLines || breakAll) && styles.textWordBreakStyle,
    lineHeight
      ? lineHeightStyle[lineHeight]
      : styles.textDefaultLineHeightStyle,
    fontSizeStyle[fontSize],
    colorStyle[color],
    whiteSpaceStyle[whiteSpace],
    lineThrough && styles.textLineThroughStyle,
    isBlurred && styles.textDummyStyle,
    display && styles.textDisplayStyle[display],
  ]);
  switch (as) {
    case "p": {
      return (
        <p className={textClass} style={textStyle}>
          {children}
        </p>
      );
    }
    case "label": {
      return (
        <label htmlFor={htmlFor} className={textClass} style={textStyle}>
          {children}
        </label>
      );
    }
    case "span": {
      return (
        <span className={textClass} style={textStyle}>
          {children}
        </span>
      );
    }
  }
};

_Text.displayName = ComponentName.Text;

export const WizText = memo(_Text);
