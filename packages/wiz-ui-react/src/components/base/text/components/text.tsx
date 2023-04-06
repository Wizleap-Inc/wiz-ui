import {
  ColorKeys,
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

export type Props = {
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
  const overflowStyles = (() => {
    if (!maxLines) return {};
    return {
      overflow: "hidden",
      display: "-webkit-box",
      webkitBoxOrient: "vertical",
      WebkitLineClamp: maxLines,
    };
  })();
  const Component = (props: { children: ReactNode }) => {
    switch (as) {
      case "p": {
        return <p>{props.children}</p>;
      }
      case "label": {
        return <label htmlFor={htmlFor}>{props.children}</label>;
      }
      case "span": {
        return <span>{props.children}</span>;
      }
    }
  };
  return (
    <div
      className={clsx(
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
      )}
      style={overflowStyles}
    >
      <Component>
        {dummyValue ? (
          <span className={styles.textDummyStyle}>{dummyValue}</span>
        ) : (
          props.children
        )}
      </Component>
    </div>
  );
};

export const WizText = memo(_Text);
