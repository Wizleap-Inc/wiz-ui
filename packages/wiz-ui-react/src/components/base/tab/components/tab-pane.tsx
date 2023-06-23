import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/tab.css";
import clsx from "clsx";
import { FC } from "react";

type Props = {
  label: string;
  name: string;
  active?: boolean;
  disabled?: boolean;
  notificationCount?: number;
  width?: string;
  onClick: (name: string) => void;
};

const TabPane: FC<Props> = ({
  label,
  name,
  active,
  disabled,
  notificationCount,
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
      className={clsx(styles.tabPaneStyle, styles.tabPaneVariantStyle[variant])}
      style={{ width }}
      onClick={() => disabled || onClick(name)}
    >
      <span className={styles.tabPaneLabelStyle}>{label}</span>
      {notificationCount !== 0 && (
        <span className={styles.tabPaneNotificationStyle}>
          {notificationCount}
        </span>
      )}
    </div>
  );
};

TabPane.displayName = ComponentName.TabPane;

export const WizTabPane = TabPane;
