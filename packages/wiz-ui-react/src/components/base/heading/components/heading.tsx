import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
import { headingStyle } from "@wizleap-inc/wiz-ui-styles/bases/heading.css";
import { colorStyle, fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, ReactNode, useMemo } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const DEFAULT_FONT_SIZE: Record<HeadingLevel, FontSizeKeys> = {
  1: "xl2",
  2: "xl",
  3: "md",
  4: "sm",
  5: "xs",
  6: "xs2",
} as const;

const DEFAULT_COLOR: Record<HeadingLevel, ColorKeys> = {
  1: "gray.900",
  2: "gray.800",
  3: "gray.700",
  4: "gray.700",
  5: "gray.700",
  6: "gray.700",
} as const;

interface Props {
  level?: HeadingLevel;
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  children: ReactNode;
}

const Heading: FC<Props> = ({ level = 1, color, fontSize, children }) => {
  const computedFontSize = useMemo(() => {
    if (fontSize) return fontSize;
    return DEFAULT_FONT_SIZE[level];
  }, [fontSize, level]);

  const computedColor = useMemo(() => {
    if (color) return color;
    return DEFAULT_COLOR[level];
  }, [color, level]);

  const tagStyle = clsx(
    headingStyle,
    fontSizeStyle[computedFontSize],
    colorStyle[computedColor]
  );

  switch (level) {
    case 1:
      return <h1 className={tagStyle}>{children}</h1>;
    case 2:
      return <h2 className={tagStyle}>{children}</h2>;
    case 3:
      return <h3 className={tagStyle}>{children}</h3>;
    case 4:
      return <h4 className={tagStyle}>{children}</h4>;
    case 5:
      return <h5 className={tagStyle}>{children}</h5>;
    case 6:
      return <h6 className={tagStyle}>{children}</h6>;
  }
};

Heading.displayName = ComponentName.Heading;

export const WizHeading = Heading;
