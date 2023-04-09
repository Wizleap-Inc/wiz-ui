import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/radio-input.css";
import clsx from "clsx";
import { memo } from "react";

import { RadioOption } from "./types";

type Props = {
  options: RadioOption[];
  value: number | null;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  gap?: SpacingKeys;
  strikeThrough?: boolean;
  onSelect?: (value: number) => void;
};

export const _Radio = ({
  options,
  value,
  disabled = false,
  direction = "horizontal",
  gap = "xl",
  strikeThrough = false,
  ...props
}: Props) => {
  const radioLabelColor = (isChecked: boolean) =>
    isChecked ? "checked" : "default";

  const radioLabelCursor = (optionDisabled?: boolean) =>
    disabled || optionDisabled ? "disabled" : "default";

  return (
    <div className={styles.radioStyle}>
      {/* WizStack <WizStack :gap="gap" :direction="direction" wrap> */}
      <div>
        {options.map((option) => (
          <div key={option.key}>
            <input
              className={styles.radioInputStyle}
              type="radio"
              name={option.key}
              id={option.key}
              value={option.value}
              disabled={disabled || option.disabled}
              onClick={() => props.onSelect?.(option.value)}
            />
            <label
              className={clsx(
                styles.radioLabelStyle,
                value === option.value && styles.radioLabelCheckedStyle,
                (disabled || option.disabled) && styles.radioLabelDisabledStyle,
                styles.radioLabelColorStyle[
                  radioLabelColor(value === option.value)
                ],
                styles.radioLabelCursorStyle[radioLabelCursor(option.disabled)],
                strikeThrough &&
                  value === option.value &&
                  styles.radioLabelStrikeThrough
              )}
              htmlFor={option.key}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const WizRadio = memo(_Radio);
