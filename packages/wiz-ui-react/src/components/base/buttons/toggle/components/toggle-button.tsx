import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
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

type Props = ComponentProps<"button"> & {
  isActive: boolean;
  inActiveIcon: TIcon;
  activeIcon: TIcon;
  disabled?: boolean;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
};

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
  ) => {
    const iconSize = (() => {
      if (size === "sm") return "xl";
      if (size === "md") return "xl2";
      if (size === "lg") return "xl3";
      return undefined;
    })();
    return (
      <button
        ref={ref}
        className={clsx(
          styles.toggleButtonStyle,
          styles.toggleButtonSizeStyle[size],
          isActive && styles.toggleButtonActiveStyle,
          disabled && styles.toggleButtonDisabledStyle,
          rounded && styles.toggleButtonRoundedStyle
        )}
        disabled={disabled}
        {...props}
      >
        <div className={clsx(gapStyle["xs2"], styles.toggleButtonStackStyle)}>
          <WizIcon
            icon={isActive ? activeIcon : inActiveIcon}
            color={"green.800"}
            size={iconSize}
          />
          {props.children}
        </div>
      </button>
    );
  }
);

_ToggleButton.displayName = ComponentName.ToggleButton;

export const WizToggleButton = memo(_ToggleButton);
