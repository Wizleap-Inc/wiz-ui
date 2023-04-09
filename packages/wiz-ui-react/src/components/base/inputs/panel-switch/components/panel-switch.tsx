import * as styles from "@wizleap-inc/wiz-ui-styles/bases/panel-switch-input.css";
import clsx from "clsx";
import { memo } from "react";

import { PanelItems } from "./type";

type Props = {
  value: number | null;
  items: PanelItems[];
  onClick?: (value: number) => void;
};
const _PanelSwitch = ({ value, items, ...props }: Props) => {
  const panelSwitchBlockColor = (key: number) =>
    value && key === value - 1 ? "active" : "default";
  return (
    <div className={styles.panelSwitchStyle}>
      {items.map((item, index) => (
        <label
          key={item.value}
          className={clsx(
            styles.panelSwitchBlockStyle,
            index !== items.length - 1 && styles.panelSwitchBlockDividerStyle,
            index === 0 && styles.panelSwitchBlockLeftStyle,
            index === items.length - 1 && styles.panelSwitchBlockRightStyle,
            value && index === value - 1 && styles.panelSwitchBlockActiveStyle,
            styles.panelSwitchBlockColorStyle[panelSwitchBlockColor(index)]
          )}
          htmlFor={`panel${item.value}`}
        >
          {item.label}
          <input
            className={styles.panelSwitchInputStyle}
            type="radio"
            id={`panel${item.value}`}
            name={`panel${item.value}`}
            value={item.value}
            onClick={() => props.onClick?.(item.value)}
          />
        </label>
      ))}
    </div>
  );
};

export const WizPanelSwitch = memo(_PanelSwitch);
