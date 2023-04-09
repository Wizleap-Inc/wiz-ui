import { getRelativeFontSize } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/icon-button.css";
import { fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { memo } from "react";

type Props = {
  //   icon: TIcon;
  variant?: "primary" | "sub" | "transparent" | "link";
  disabled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
};

const _IconButton = ({
  //   icon,
  variant = "primary",
  disabled = false,
  size = "md",
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        styles.iconButtonStyle[variant],
        disabled && styles.iconButtonDisabledStyle,
        fontSizeStyle[getRelativeFontSize(size, 3)]
      )}
      disabled={disabled}
      onClick={props.onClick}
    >
      <div
        className={styles.iconButtonSVGStyle[variant]}
        style={{ width: "1rem", height: "1rem" }}
      >
        {/* icon */}
      </div>
    </button>
  );
};
export const WizIconButton = memo(_IconButton);
