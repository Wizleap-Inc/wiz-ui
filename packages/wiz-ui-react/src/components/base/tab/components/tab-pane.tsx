import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/tab.css";
import clsx from "clsx";
import {
  ComponentProps,
  ForwardedRef,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  memo,
} from "react";

type Props = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  notificationCount?: number;
  width?: string;
  children?: ReactNode;
} & ComponentProps<"div">;

const _TabPane = forwardRef(
  (
    {
      label,
      active,
      disabled,
      notificationCount,
      width = "100%",
      ...props
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const variant = (() => {
      if (active) return "active";
      if (disabled) return "disabled";
      return "default";
    })();
    const onClick: MouseEventHandler<HTMLDivElement> = (e) =>
      disabled || props.onClick?.(e);
    return (
      <div
        ref={ref}
        className={clsx(
          styles.tabPaneStyle,
          styles.tabPaneVariantStyle[variant]
        )}
        style={{ width }}
        {...props}
        onClick={onClick}
      >
        <span className={styles.tabPaneLabelStyle}>{label}</span>
        {notificationCount && (
          <span className={styles.tabPaneNotificationStyle}>
            {notificationCount}
          </span>
        )}
        {props.children}
      </div>
    );
  }
);

_TabPane.displayName = ComponentName.TabPane;

export const WizTabPane = memo(_TabPane);
