import { ComponentName, FontSizeKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/toggle-button.css";
import { gapStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  ComponentProps,
  ForwardedRef,
  ReactNode,
  forwardRef,
  memo,
} from "react";

import { TIcon, WizIcon } from "@/components";

const iconSize: Record<string, FontSizeKeys> = {
  sm: "xl",
  md: "xl2",
  lg: "xl3",
};

type Props = {
  isActive: boolean;
  inActiveIcon: TIcon;
  activeIcon: TIcon;
  disabled?: boolean;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
} & ComponentProps<"button">;

const _ToggleButton = forwardRef(
  (
    {
      inActiveIcon,
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
        styles.toggleButtonStyle,
        styles.toggleButtonSizeStyle[size],
        isActive && styles.toggleButtonActiveStyle,
        disabled && styles.toggleButtonDisabledStyle,
        rounded && styles.toggleButtonRoundedStyle
      )}
      disabled={disabled}
    >
      <div className={clsx(gapStyle["xs2"], styles.toggleButtonStackStyle)}>
        <WizIcon
          icon={isActive ? activeIcon : inActiveIcon}
          color={"green.800"}
          size={iconSize[size]}
        />
        {props.children}
      </div>
    </button>
  )
);

_ToggleButton.displayName = ComponentName.ToggleButton;

export const WizToggleButton = memo(_ToggleButton);
