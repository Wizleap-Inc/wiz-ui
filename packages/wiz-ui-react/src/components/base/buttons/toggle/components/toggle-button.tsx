import { ComponentName, FontSizeKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/toggle-button.css";
import clsx from "clsx";
import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from "react";

import { TIcon, WizHStack, WizIcon } from "@/components";
import { BaseProps } from "@/types";

const iconSize: Record<string, FontSizeKeys> = {
  sm: "xl",
  md: "xl2",
  lg: "xl3",
};

type Props = BaseProps & {
  isActive: boolean;
  inactiveIcon: TIcon;
  activeIcon: TIcon;
  disabled?: boolean;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
} & ComponentProps<"button">;

const ToggleButton = forwardRef(
  (
    {
      className,
      style,
      inactiveIcon,
      activeIcon,
      disabled = false,
      rounded = true,
      size = "md",
      isActive,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <button
      ref={ref}
      {...props}
      className={clsx(
        className,
        styles.toggleButtonStyle,
        styles.toggleButtonSizeStyle[size],
        isActive && styles.toggleButtonActiveStyle,
        disabled && styles.toggleButtonDisabledStyle,
        rounded && styles.toggleButtonRoundedStyle
      )}
      style={style}
      disabled={disabled}
    >
      <WizHStack align="center" gap="xs2">
        <WizIcon
          icon={isActive ? activeIcon : inactiveIcon}
          color={"green.800"}
          size={iconSize[size]}
        />
        {props.children}
      </WizHStack>
    </button>
  )
);

ToggleButton.displayName = ComponentName.ToggleButton;

export const WizToggleButton = ToggleButton;
