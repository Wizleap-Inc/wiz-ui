import { ColorKeys, FontSizeKeys } from "@wizleap-inc/wiz-ui-constants";
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

import { WizIcon, TIcon } from "@/components";

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

const variantColor: Record<"primary" | "sub", ColorKeys> = {
  primary: "white.800",
  sub: "gray.800",
};

const iconSize: Record<"xs" | "sm" | "md" | "lg", FontSizeKeys> = {
  xs: "lg",
  sm: "xl",
  md: "xl2",
  lg: "xl3",
};

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
  const content = [
    icon && (
      <WizIcon
        icon={icon}
        color={variantColor[variant]}
        size={iconSize[size]}
      />
    ),
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
