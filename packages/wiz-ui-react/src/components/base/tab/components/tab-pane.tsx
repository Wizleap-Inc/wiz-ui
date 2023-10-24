import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/tab.css";
import clsx from "clsx";
import { FC } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  label: string;
  name: string;
  active?: boolean;
  disabled?: boolean;
  notificationCount?: number;
  badgeColor?: "red" | "green";
  width?: string;
  onClick: (name: string) => void;
};

const TabPane: FC<Props> = ({
  className,
  style,
  label,
  name,
  active,
  disabled,
  notificationCount = 0,
  badgeColor = "red",
  width = "100%",
  onClick,
}: Props) => {
  const variant = (() => {
    if (active) return "active";
    if (disabled) return "disabled";
    return "default";
  })();

  return (
    <div
      className={clsx(
        className,
        styles.tabPaneStyle,
        styles.tabPaneVariantStyle[variant]
      )}
      style={{ ...style, width }}
      onClick={() => disabled || onClick(name)}
    >
      <span className={styles.tabPaneLabelStyle}>{label}</span>
      {notificationCount > 0 && (
        <span className={styles.tabPaneNotificationStyle[badgeColor]}>
          {notificationCount}
        </span>
      )}
    </div>
  );
};

TabPane.displayName = ComponentName.TabPane;

export const WizTabPane = TabPane;
