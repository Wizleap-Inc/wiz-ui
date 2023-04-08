import {
  textButtonStyle,
  textButtonDisabledStyle,
  textButtonRoundStyle,
  textButtonExpandStyle,
  textButtonSizeStyle,
  textButtonStackStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/text-button.css";
import { gapStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  onClick?: () => void;
  variant?: "primary" | "sub";
  disabled?: boolean;
  rounded?: boolean;
  expand?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  // icon?: TIcon;
  iconPosition?: "left" | "right";
  children?: ReactNode;
} & ComponentProps<"button">;

const _TextButton = ({
  variant = "primary",
  disabled = false,
  rounded = true,
  expand = false,
  size = "md",
  // icon,
  // iconPosition = "left",
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={clsx(
        textButtonStyle[variant],
        textButtonSizeStyle[size],
        disabled && textButtonDisabledStyle,
        rounded && textButtonRoundStyle,
        expand && textButtonExpandStyle
      )}
      disabled={disabled}
      onClick={props.onClick}
    >
      <div className={clsx(gapStyle["xs2"], textButtonStackStyle)}>
        {/* icon */}
        {props.children}
      </div>
    </button>
  );
};

export const WizTextButton = memo(_TextButton);
