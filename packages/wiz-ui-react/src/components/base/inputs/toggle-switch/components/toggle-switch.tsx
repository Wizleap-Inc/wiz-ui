import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/toggle-switch-input.css";
import clsx from "clsx";

type Props = {
  value: boolean;
  ariaLabel: string;
  setValue: (value: boolean) => void;
};

const ToggleSwitch = ({ value, ariaLabel, ...props }: Props) => {
  const switchState = value ? "checked" : "default";

  return (
    <label className={styles.toggleSwitchStyle}>
      <input
        className={styles.toggleSwitchInputStyle}
        type="checkbox"
        aria-label={ariaLabel}
        onChange={(e) => props.setValue(e.target.checked)}
      />
      <span
        className={clsx(
          styles.toggleSwitchSliderStyle,
          styles.toggleSwitchColorStyle[switchState],
          value && styles.toggleSwitchSliderCheckedStyle
        )}
      />
    </label>
  );
};

ToggleSwitch.displayName = ComponentName.ToggleSwitch;

export const WizToggleSwitch = ToggleSwitch;
