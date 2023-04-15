import { FontSizeKeys, FontWeightKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/tag.css";
import {
  fontSizeStyle,
  fontWeightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { memo } from "react";

import { TIcon, WizIcon } from "@/components";

type Props = {
  label: string;
  icon?: TIcon;
  variant?: "info" | "error" | "success" | "mono";
  fontSize?: FontSizeKeys;
  fontWeight?: FontWeightKeys;
  width?: string;
};

const _Tag = ({
  label,
  icon,
  variant = "info",
  fontSize = "md",
  fontWeight = "normal",
  width,
  ...props
}: Props) => {
  return (
    <div
      className={clsx(
        styles.tagStyle,
        styles.tagColorStyle[variant],
        fontSizeStyle[fontSize],
        fontWeightStyle[fontWeight]
      )}
      style={{
        width: width || "max-content",
      }}
    >
      {icon && (
        <WizIcon icon={icon} color={styles.tagIconColorStyle[variant]} />
      )}
      {label}
    </div>
  );
};
export const WizTag = memo(_Tag);
