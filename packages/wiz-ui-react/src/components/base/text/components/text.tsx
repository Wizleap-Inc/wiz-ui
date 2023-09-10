import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
  WhiteSpaceKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text.css";
import {
  lineHeightStyle,
  fontSizeStyle,
  colorStyle,
  whiteSpaceStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode, memo } from "react";

type Props = {
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
  const style = maxLines
    ? {
        overflow: "hidden",
        display: "-webkit-box",
        webkitBoxOrient: "vertical",
        WebkitLineClamp: maxLines,
      }
    : undefined;
  const className = clsx([
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
        <p className={className} style={style}>
          {children}
        </p>
      );
    }
    case "label": {
      return (
        <label htmlFor={htmlFor} className={className} style={style}>
          {children}
        </label>
      );
    }
    case "span": {
      return (
        <span className={className} style={style}>
          {children}
        </span>
      );
    }
  }
};

_Text.displayName = ComponentName.Text;

export const WizText = memo(_Text);
