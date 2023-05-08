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
  dummyValue?: string;
  breakAll?: boolean;
  textAlign?: "start" | "end" | "left" | "right" | "center";
  lineThrough?: boolean;
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
  dummyValue,
  breakAll,
  textAlign = "start",
  lineThrough = false,
  ...props
}: Props) => {
  const style = maxLines
    ? {
        overflow: "hidden",
        display: "-webkit-box",
        webkitBoxOrient: "vertical",
        WebkitLineClamp: maxLines,
      }
    : undefined;
  const className = clsx(
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
    lineThrough && styles.textLineThroughStyle
  );
  const content = dummyValue ? (
    <span className={styles.textDummyStyle}>{dummyValue}</span>
  ) : (
    props.children && props.children
  );
  switch (as) {
    case "p": {
      return (
        <p className={className} style={style}>
          {content}
        </p>
      );
    }
    case "label": {
      return (
        <label htmlFor={htmlFor} className={className} style={style}>
          {content}
        </label>
      );
    }
    case "span": {
      return (
        <span className={className} style={style}>
          {content}
        </span>
      );
    }
  }
};

_Text.displayName = ComponentName.Text;

export const WizText = memo(_Text);
