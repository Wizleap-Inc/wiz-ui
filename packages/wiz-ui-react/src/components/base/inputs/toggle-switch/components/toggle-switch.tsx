import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/toggle-switch-input.css";
import clsx from "clsx";
import { FC } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  value: boolean;
  ariaLabel: string;
  disabled?: boolean;
  setValue: (value: boolean) => void;
};

const ToggleSwitch: FC<Props> = ({
  className,
  style,
  value,
  ariaLabel,
  disabled,
  ...props
}) => {
  const switchState = value ? "checked" : "default";

  return (
    <label className={clsx(className, styles.toggleSwitchStyle)} style={style}>
      <input
        className={styles.toggleSwitchInputStyle}
        type="checkbox"
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => props.setValue(e.target.checked)}
      />
      <span
        className={clsx(
          styles.toggleSwitchSliderStyle[switchState],
          disabled
            ? styles.toggleSwitchDisabledColorStyle[switchState]
            : styles.toggleSwitchColorStyle[switchState]
        )}
      />
    </label>
  );
};

ToggleSwitch.displayName = ComponentName.ToggleSwitch;

export const WizToggleSwitch = ToggleSwitch;
