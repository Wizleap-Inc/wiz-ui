import * as styles from "@wizleap-inc/wiz-ui-styles/bases/toggle-button.css";
import { gapStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode, memo } from "react";

type Props = {
  // inActiveIcon ?: TIcon;
  // activeIcon ?: TIcon;
  isActive: boolean;
  disabled?: boolean;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  onClick?: () => void;
};

const _TextButton = ({
  // inActiveIcon,
  // activeIcon,
  disabled = false,
  rounded = true,
  size = "md",
  isActive,
  onClick,
  ...props
}: Props) => {
  const iconSize = (() => {
    if (size === "sm") return "xl";
    if (size === "md") return "xl2";
    if (size === "lg") return "xl3";
    return undefined;
  })();
  return (
    <button
      className={clsx(
        styles.toggleButtonStyle,
        styles.toggleButtonSizeStyle[size],
        isActive && styles.toggleButtonActiveStyle,
        disabled && styles.toggleButtonDisabledStyle,
        rounded && styles.toggleButtonRoundedStyle
      )}
      disabled={disabled}
      onClick={() => {
        if (!disabled) onClick?.();
      }}
    >
      <div className={clsx(gapStyle["xs2"], styles.toggleButtonStackStyle)}>
        {/* icon */}
        {props.children}
      </div>
    </button>
  );
};

export const WizToggleButton = memo(_TextButton);
