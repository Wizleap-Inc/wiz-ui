import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-button.css";
import { gapStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  ComponentProps,
  ForwardedRef,
  ReactNode,
  forwardRef,
  memo,
} from "react";

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

const _TextButton = forwardRef(
  (
    {
      variant = "primary",
      disabled = false,
      rounded = true,
      expand = false,
      size = "md",
      icon,
      iconPosition = "left",
      ...props
    }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
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
        ref={ref}
        {...props}
        className={clsx(
          styles.textButtonStyle[variant],
          styles.textButtonSizeStyle[size],
          disabled && styles.textButtonDisabledStyle,
          rounded && styles.textButtonRoundStyle,
          expand && styles.textButtonExpandStyle
        )}
        disabled={disabled}
      >
        <div className={clsx(gapStyle["xs2"], styles.textButtonStackStyle)}>
          {...iconPosition === "left" ? content : content.reverse()}
        </div>
      </button>
    );
  }
);

_TextButton.displayName = ComponentName.TextButton;

export const WizTextButton = memo(_TextButton);
