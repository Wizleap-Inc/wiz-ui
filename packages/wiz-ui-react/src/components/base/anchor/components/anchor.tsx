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
import {
  ComponentProps,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react";

import { TIcon, WizIcon } from "@/components";

type Props<T extends ElementType> = {
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: FontWeightKeys;
  icon?: TIcon;
  iconPosition?: "left" | "right";
  openInNewTab?: boolean;
  nowrap?: boolean;
  children: ReactNode;
} & (
  | {
      href: string;
      as?: never;
      asProps?: never;
    }
  | {
      href?: never;
      as: T;
      asProps: ComponentProps<T>;
    }
);

/**
 * aタグでの使い方
 * ```tsx
 * <WizAnchor href="https://xxx" { ...otherProps } />
 * <WizAnchor href="https://xxx" target="_blank", rel="noopener noreferrer" { ...otherProps } />
 * ```
 *
 * `react-router`での使い方
 * ```tsx
 * import { Link } from "react-router-dom";
 * <WizAnchor as={Link} asProps={{ to: "/page1" }} { ...otherProps } />
 * <WizAnchor as={Link} asProps={{ to: "/page1", target: "_blank", rel: "noopener noreferrer" }} { ...otherProps } />
 * ```
 */
const Anchor = forwardRef(
  <T extends ElementType>(
    {
      color = "blue.800",
      fontSize = "md",
      fontWeight = "normal",
      icon,
      iconPosition = "left",
      openInNewTab,
      nowrap = false,
      children,
      ...props
    }: Props<T>,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const isAnchor = "href" in props;
    const LinkComponent = isAnchor ? "a" : props.as;
    const linkProps = isAnchor ? { href: props.href } : props.asProps;

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
      <LinkComponent
        {...linkProps}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        ref={ref}
        className={anchorStyle}
      >
        {iconPosition === "left" && iconContent}
        {children}
        {iconPosition === "right" && iconContent}
      </LinkComponent>
    );
  }
);

Anchor.displayName = ComponentName.Anchor;

export const WizAnchor = Anchor;
