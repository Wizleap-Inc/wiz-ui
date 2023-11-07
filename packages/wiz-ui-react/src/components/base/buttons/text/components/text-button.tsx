import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-button.css";
import clsx from "clsx";
import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from "react";

import { TIcon, WizHStack, WizIcon } from "@/components";
import { BaseProps } from "@/types";
type Props = BaseProps & {
  variant?: "primary" | "sub" | "danger" | "sub-danger";
  disabled?: boolean;
  rounded?: boolean;
  expand?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  icon?: TIcon;
  iconPosition?: "left" | "right";
  children?: ReactNode;
} & ComponentProps<"button">;

const variantColor: Record<
  "primary" | "sub" | "danger" | "sub-danger",
  ColorKeys
> = {
  primary: "white.800",
  sub: "green.800",
  danger: "white.800",
  "sub-danger": "red.800",
};

const iconSize: Record<"xs" | "sm" | "md" | "lg", FontSizeKeys> = {
  xs: "lg",
  sm: "xl",
  md: "xl2",
  lg: "xl3",
};

const TextButton = forwardRef(
  (
    {
      className,
      style,
      variant = "primary",
      disabled = false,
      rounded = true,
      expand = false,
      size = "md",
      icon,
      iconPosition = "left",
      children,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsx(
          className,
          styles.textButtonStyle[variant],
          styles.textButtonSizeStyle[size],
          disabled && styles.textButtonDisabledStyle,
          rounded && styles.textButtonRoundStyle,
          expand && styles.textButtonExpandStyle
        )}
        style={style}
        disabled={disabled}
      >
        <WizHStack
          align="center"
          justify="center"
          gap="xs2"
          reverse={iconPosition === "right"}
        >
          {icon && (
            <WizIcon
              icon={icon}
              color={variantColor[variant]}
              size={iconSize[size]}
            />
          )}
          {children}
        </WizHStack>
      </button>
    );
  }
);

TextButton.displayName = ComponentName.TextButton;

export const WizTextButton = TextButton;
