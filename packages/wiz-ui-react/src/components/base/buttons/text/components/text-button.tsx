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

import { WizIcon } from "@/components";
import { TIcon } from "@/components/icons";

type Props = {
  variant?: "primary" | "sub";
  disabled?: boolean;
  rounded?: boolean;
  expand?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  icon?: TIcon;
  iconPosition?: "left" | "right";
  children?: ReactNode;
} & ComponentProps<"button">;

const _TextButton = ({
  variant = "primary",
  disabled = false,
  rounded = true,
  expand = false,
  size = "md",
  icon,
  iconPosition = "left",
  ...props
}: Props) => {
  const variantColor = (() => {
    if (variant === "primary") return "white.800";
    if (variant === "sub") return "gray.800";
    return undefined;
  })();
  const iconSize = (() => {
    if (size === "xs") return "lg";
    if (size === "sm") return "xl";
    if (size === "md") return "xl2";
    if (size === "lg") return "xl3";
    return undefined;
  })();
  const content = [
    icon && <WizIcon icon={icon} color={variantColor} size={iconSize} />,
    props.children,
  ];
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
        {...iconPosition === "left" ? content : content.reverse()}
      </div>
    </button>
  );
};

export const WizTextButton = memo(_TextButton);
