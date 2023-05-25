import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
  FontWeightKeys,
  getRelativeFontSize,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/anchor.css";
import {
  colorStyle,
  fontSizeStyle,
  fontWeightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from "react";

import { TIcon, WizIcon } from "@/components";

type Props = {
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: FontWeightKeys;
  icon?: TIcon;
  iconPosition?: "left" | "right";
  openInNewTab?: boolean;
  nowrap?: boolean;
  children: ReactNode;
} & ComponentProps<"a">;

const Anchor = forwardRef(
  (
    {
      color = "blue.800",
      fontSize = "md",
      fontWeight = "normal",
      icon,
      iconPosition = "left",
      openInNewTab = false,
      nowrap = false,
      children,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const anchorStyle = clsx([
      styles.anchorStyle,
      colorStyle[color],
      fontSizeStyle[fontSize],
      fontWeightStyle[fontWeight],
      nowrap && styles.anchorNoWrapStyle,
    ]);

    const iconContent = icon && (
      <WizIcon
        icon={icon}
        size={getRelativeFontSize(fontSize, 3)}
        color={color}
      />
    );

    return (
      <a
        {...props}
        ref={ref}
        className={anchorStyle}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {iconPosition === "left" && iconContent}
        {children}
        {iconPosition === "right" && iconContent}
      </a>
    );
  }
);

Anchor.displayName = ComponentName.Anchor;

export const WizAnchor = Anchor;
