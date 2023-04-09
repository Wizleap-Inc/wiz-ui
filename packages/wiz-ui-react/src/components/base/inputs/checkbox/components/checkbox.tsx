import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/checkbox-input.css";
import clsx from "clsx";
import { memo } from "react";

import { CheckBoxOption } from "./types";

type Props = {
  options: CheckBoxOption[];
  value: number[];
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  gap?: SpacingKeys;
  strikeThrough?: boolean;
  onChange?: (value: number, checked: boolean) => void;
};

const _CheckBox = ({
  options,
  value,
  disabled,
  direction = "horizontal",
  gap = "xl",
  strikeThrough = false,
  ...props
}: Props) => {
  const labelPointer = (optionDisabled?: boolean) =>
    disabled || optionDisabled ? "disabled" : "default";
  return (
    <div className={styles.checkboxStyle}>
      {/* <WizWtack gap={gap} direction={direction} wrap> */}
      <div>
        {options?.map((option) => {
          return (
            <div key={option.key}>
              <input
                className={styles.checkboxInputStyle}
                type="checkbox"
                id={option.key}
                name={option.key}
                value={option.value}
                disabled={disabled || option.disabled}
                onChange={(e) => {
                  props.onChange?.(option.value, e.target.checked);
                }}
                // change
              />
              <label
                className={clsx(
                  styles.checkboxLabelStyle,
                  value.includes(option.value) &&
                    styles.checkboxLabelCheckedStyle,
                  (disabled || option.disabled) &&
                    styles.checkboxLabelDisabledStyle,
                  styles.checkboxLabelCursorStyle[labelPointer(option.disabled)]
                )}
                htmlFor={option.key}
              >
                {/* icon */}
                <span
                  className={clsx(
                    value.includes(option.value) &&
                      styles.checkboxBlockCheckedStyle,
                    strikeThrough &&
                      value.includes(option.value) &&
                      styles.checkboxLabelStrikeThrough
                  )}
                >
                  {option.label}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const WizCheckBox = memo(_CheckBox);
