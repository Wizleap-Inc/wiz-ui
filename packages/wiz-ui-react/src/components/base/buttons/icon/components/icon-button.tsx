import {
  ColorKeys,
  ComponentName,
  getRelativeFontSize,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/icon-button.css";
import clsx from "clsx";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

import { TIcon, WizIcon } from "@/components";
import { BaseProps } from "@/types";
type Props = BaseProps & {
  icon: TIcon;
  variant?: "primary" | "sub" | "transparent" | "link";
  disabled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
} & ComponentProps<"button">;

const iconSVGColor: Record<string, ColorKeys> = {
  primary: "white.800",
  sub: "green.800",
  transparent: "gray.800",
  link: "blue.800",
};

const IconButton = forwardRef(
  (
    {
      className,
      style,
      icon,
      variant = "primary",
      disabled = false,
      size = "md",
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
          styles.iconButtonStyle[variant],
          disabled && styles.iconButtonDisabledStyle
        )}
        style={style}
        disabled={disabled}
      >
        <WizIcon
          icon={icon}
          color={iconSVGColor[variant]}
          size={getRelativeFontSize(size, 3)}
        />
      </button>
    );
  }
);

IconButton.displayName = ComponentName.IconButton;

export const WizIconButton = IconButton;
