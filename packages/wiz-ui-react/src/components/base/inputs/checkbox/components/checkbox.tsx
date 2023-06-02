import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/checkbox-input.css";
import clsx from "clsx";
import { FC } from "react";

import { WizICheck, WizStack } from "@/components";

import { CheckBoxOption } from "./types";

type Props = {
  options: CheckBoxOption[];
  value: number[];
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  gap?: SpacingKeys;
  strikeThrough?: boolean;
  onChange?: (value: number[]) => void;
};

const CheckBox: FC<Props> = ({
  options,
  value,
  disabled,
  direction = "horizontal",
  gap = "xl",
  strikeThrough = false,
  onChange,
}) => {
  return (
    <div className={styles.checkboxStyle}>
      <WizStack gap={gap} direction={direction} wrap>
        {options.map((option) => {
          const isChecked = value.includes(option.value);
          const isDisabled = disabled || option.disabled;
          return (
            <div key={option.key}>
              <input
                className={styles.checkboxInputStyle}
                type="checkbox"
                id={option.key}
                name={option.key}
                value={option.value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => {
                  if (!onChange) {
                    return;
                  }
                  if (isChecked) {
                    onChange(value.filter((v) => v !== option.value));
                  } else {
                    onChange([...value, option.value]);
                  }
                }}
              />
              <label
                className={clsx(
                  styles.checkboxLabelStyle,
                  isChecked && styles.checkboxLabelCheckedStyle,
                  isDisabled && styles.checkboxLabelDisabledStyle,
                  styles.checkboxLabelCursorStyle[
                    isDisabled ? "disabled" : "default"
                  ]
                )}
                htmlFor={option.key}
              >
                {isChecked && (
                  <div className={styles.checkboxIconStyle}>
                    <WizICheck />
                  </div>
                )}
                <span
                  className={clsx(
                    isChecked && styles.checkboxBlockCheckedStyle,
                    strikeThrough &&
                      isChecked &&
                      styles.checkboxLabelStrikeThrough
                  )}
                >
                  {option.label}
                </span>
              </label>
            </div>
          );
        })}
      </WizStack>
    </div>
  );
};

CheckBox.displayName = ComponentName.CheckBox;

export const WizCheckBox = CheckBox;
