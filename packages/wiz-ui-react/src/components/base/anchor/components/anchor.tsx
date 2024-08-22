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
import { BaseProps } from "@/types";

type Props<T extends ElementType> = BaseProps & {
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: FontWeightKeys;
  icon?: TIcon;
  iconPosition?: "left" | "right";
  nowrap?: boolean;
  children: ReactNode;
} & (
    | {
        href: string;
        as?: never;
        asProps?: never;
        openInNewTab?: boolean;
      }
    | {
        href?: never;
        as: T;
        asProps: ComponentProps<T>;
        openInNewTab?: never;
      }
  ) &
  Pick<ComponentProps<"a">, "onClick">;

const Anchor = forwardRef(
  <T extends ElementType>(
    {
      className,
      style,
      color = "blue.800",
      fontSize = "md",
      fontWeight = "normal",
      icon,
      iconPosition = "left",
      openInNewTab,
      nowrap = false,
      onClick,
      children,
      ...props
    }: Props<T>,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const isAnchor = "href" in props;
    const LinkComponent = isAnchor ? "a" : props.as;
    const linkProps = isAnchor
      ? {
          href: props.href,
          target: openInNewTab ? "_blank" : undefined,
          rel: openInNewTab ? "noopener noreferrer" : undefined,
        }
      : props.asProps;

    const anchorStyle = clsx([
      className,
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
        ref={ref}
        className={anchorStyle}
        style={style}
        onClick={onClick}
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
