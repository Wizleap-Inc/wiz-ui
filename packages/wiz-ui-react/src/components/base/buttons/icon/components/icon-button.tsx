import { ColorKeys, getRelativeFontSize } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/icon-button.css";
import clsx from "clsx";
import { memo } from "react";

import { TIcon, WizIcon } from "@/components";

type Props = {
  icon: TIcon;
  variant?: "primary" | "sub" | "transparent" | "link";
  disabled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
};

const _IconButton = ({
  icon,
  variant = "primary",
  disabled = false,
  size = "md",
  ...props
}: Props) => {
  const iconSVGColor: {
    [key in "primary" | "sub" | "transparent" | "link"]: ColorKeys;
  } = {
    primary: "white.800",
    sub: "green.800",
    transparent: "gray.800",
    link: "blue.800",
  };
  return (
    <button
      className={clsx(
        styles.iconButtonStyle[variant],
        disabled && styles.iconButtonDisabledStyle
      )}
      disabled={disabled}
      onClick={props.onClick}
    >
      <WizIcon
        icon={icon}
        color={iconSVGColor[variant]}
        size={getRelativeFontSize(size, 3)}
      />
    </button>
  );
};
export const WizIconButton = memo(_IconButton);
