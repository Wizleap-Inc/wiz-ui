import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/panel-switch-input.css";
import clsx from "clsx";
import { FC, useId, ComponentPropsWithoutRef } from "react";

import { PanelItems } from "./type";

type Props = ComponentPropsWithoutRef<"div"> & {
  value: number | null;
  items: PanelItems[];
  width?: string;
  onChange: (value: number) => void;
};

const PanelSwitch: FC<Props> = ({
  className,
  style,
  value,
  items,
  width,
  onChange,
  ...props
}) => {
  const idPrefix = useId();

  return (
    <div
      {...props}
      className={clsx(className, styles.panelSwitchStyle)}
      style={{ ...style, ...(width ? { width } : {}) }}
    >
      {items.map((item, index) => {
        const radioId = `${idPrefix}-${item.value}`;
        const isFirstItem = index === 0;
        const isLastItem = index === items.length - 1;
        const isActiveItem = value && value === item.value;
        return (
          <label
            key={item.value}
            className={clsx(
              styles.panelSwitchBlockStyle,
              !isLastItem && styles.panelSwitchBlockDividerStyle,
              isFirstItem && styles.panelSwitchBlockLeftStyle,
              isLastItem && styles.panelSwitchBlockRightStyle,
              isActiveItem && styles.panelSwitchBlockActiveStyle,
              styles.panelSwitchBlockColorStyle[
                isActiveItem ? "active" : "default"
              ]
            )}
            htmlFor={radioId}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onChange?.(item.value);
            }}
          >
            {item.label}
            <input
              className={styles.panelSwitchInputStyle}
              type="radio"
              id={radioId}
              name={item.name}
              value={item.value}
              onClick={() => onChange?.(item.value)}
            />
          </label>
        );
      })}
    </div>
  );
};

PanelSwitch.displayName = ComponentName.PanelSwitch;

export const WizPanelSwitch = PanelSwitch;
