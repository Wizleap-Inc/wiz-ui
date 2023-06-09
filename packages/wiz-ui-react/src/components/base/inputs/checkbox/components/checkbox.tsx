import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/checkbox-input.css";
import clsx from "clsx";
import { FC, useState } from "react";

import { WizICheck, WizStack } from "@/components";

import { CheckBoxOption } from "./types";

type Props = {
  options: CheckBoxOption[];
  values: number[];
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  gap?: SpacingKeys;
  strikeThrough?: boolean;
  onChange?: (values: number[]) => void;
};

const CheckBox: FC<Props> = ({
  options,
  values,
  disabled,
  direction = "horizontal",
  gap = "xl",
  strikeThrough = false,
  onChange,
}) => {
  const [focusedKey, setFocusedKey] = useState<CheckBoxOption["key"] | null>(
    null
  );

  return (
    <div className={styles.checkboxStyle}>
      <WizStack gap={gap} direction={direction} wrap>
        {options.map((option) => {
          const isChecked = values.includes(option.value);
          const isDisabled = disabled || option.disabled;
          const isFocused = !isDisabled && option.key === focusedKey;
          return (
            <div key={option.key}>
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
                      onChange(values.filter((v) => v !== option.value));
                    } else {
                      onChange([...values, option.value]);
                    }
                  }}
                  onFocus={() => setFocusedKey(option.key)}
                  onBlur={() => setFocusedKey(null)}
                />
                <span className={styles.checkboxIconContainerStyle}>
                  <WizICheck
                    className={clsx(
                      styles.checkboxIconBaseStyle,
                      styles.checkboxIconVariantStyle[
                        isChecked ? "checked" : "default"
                      ],
                      isFocused &&
                        styles.checkboxIconFocusedColorStyle[
                          isChecked ? "checked" : "default"
                        ]
                    )}
                  />
                </span>
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
