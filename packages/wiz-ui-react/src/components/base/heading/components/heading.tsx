import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
import { headingStyle } from "@wizleap-inc/wiz-ui-styles/bases/heading.css";
import { colorStyle, fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, ReactNode } from "react";

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

import { BaseProps } from "@/types";
type Props = BaseProps & {
  level?: HeadingLevel;
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  children: ReactNode;
};

const Heading: FC<Props> = ({
  className,
  style,
  level = 1,
  color = DEFAULT_COLOR[level],
  fontSize = DEFAULT_FONT_SIZE[level],
  children,
}) => {
  const headingClassName = clsx(
    className,
    headingStyle,
    fontSizeStyle[fontSize],
    colorStyle[color]
  );

  switch (level) {
    case 1:
      return (
        <h1 className={headingClassName} style={style}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={headingClassName} style={style}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={headingClassName} style={style}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={headingClassName} style={style}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={headingClassName} style={style}>
          {children}
        </h5>
      );
    case 6:
      return (
        <h6 className={headingClassName} style={style}>
          {children}
        </h6>
      );
  }
};

Heading.displayName = ComponentName.Heading;

export const WizHeading = Heading;
