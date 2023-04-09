import {
  toggleSwitchStyle,
  toggleSwitchInputStyle,
  toggleSwitchSliderStyle,
  toggleSwitchSliderCheckedStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/toggle-switch-input.css";
import clsx from "clsx";
import { memo } from "react";

type Props = {
  value: boolean;
  ariaLabel: string;
  onChange: (value: boolean) => void;
};

const _ToggleSwitch = ({ value, ariaLabel, ...props }: Props) => (
  <label className={toggleSwitchStyle}>
    <input
      className={toggleSwitchInputStyle}
      type="checkbox"
      aria-label={ariaLabel}
      onChange={(e) => props.onChange(e.target.checked)}
    />
    <span
      className={clsx(
        toggleSwitchSliderStyle,
        value && toggleSwitchSliderCheckedStyle
      )}
    />
  </label>
);
export const WizToggleSwitch = memo(_ToggleSwitch);
