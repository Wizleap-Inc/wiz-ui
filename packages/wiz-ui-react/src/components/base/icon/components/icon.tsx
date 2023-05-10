import { ColorKeys, FontSizeKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/icon.css";
import { fillStyle, fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { clsx } from "clsx";
import { memo } from "react";

import { TIcon } from "@/components/icons";

type Props = {
  icon: TIcon;
  color?: ColorKeys | "inherit";
  size?: FontSizeKeys;
};

const _Icon = ({ color = "gray.700", size = "xl2", ...props }: Props) => {
  const colorStyle =
    color === "inherit" ? styles.iconDefaultStyle : fillStyle[color];
  const IconComponent = props.icon;
  return (
    <div className={clsx(styles.iconStyle, styles.iconSizeStyle[size])}>
      <div className={clsx(fontSizeStyle[size], colorStyle)}>
        <IconComponent />
      </div>
    </div>
  );
};

export const WizIcon = memo(_Icon);
