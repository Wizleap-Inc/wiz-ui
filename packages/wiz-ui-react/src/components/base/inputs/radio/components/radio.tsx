import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/radio-input.css";
import clsx from "clsx";
import { FC, useId, useState } from "react";

import { WizStack } from "@/components";

import { RadioOption } from "./types";

type Props = {
  options: RadioOption[];
  value: number | null;
  name?: string;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  gap?: SpacingKeys;
  strikeThrough?: boolean;
  onChange?: (value: number) => void;
};

export const Radio: FC<Props> = ({
  options,
  value,
  name,
  disabled = false,
  direction = "horizontal",
  gap = "xl",
  strikeThrough = false,
  onChange,
}: Props) => {
  const idPrefix = useId();
  const [focusOption, setFocusOption] = useState<number | null>(null);

  const radioLabelColor = (inputValue: number) => {
    if (value === inputValue) return "checked";
    if (focusOption === inputValue) return "focused";
    return "default";
  };

  return (
    <div className={styles.radioStyle}>
      <WizStack gap={gap} direction={direction}>
        {options.map((option) => {
          const id = `${idPrefix}-${option.value}`;
          const isChecked = value === option.value;
          const isDisabled = disabled || option.disabled;
          return (
            <div key={id}>
              <input
                className={styles.radioInputStyle}
                type="radio"
                id={id}
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={isDisabled}
                onClick={() => {
                  onChange?.(option.value);
                }}
                onFocus={() => {
                  setFocusOption(option.value);
                }}
                onBlur={() => {
                  setFocusOption(null);
                }}
              />
              <label
                className={clsx(
                  styles.radioLabelStyle,
                  isChecked && styles.radioLabelCheckedStyle,
                  isDisabled && styles.radioLabelDisabledStyle,
                  styles.radioLabelColorStyle[radioLabelColor(option.value)],
                  styles.radioLabelCursorStyle[
                    isDisabled ? "disabled" : "default"
                  ],
                  strikeThrough && isChecked && styles.radioLabelStrikeThrough
                )}
                htmlFor={id}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </WizStack>
    </div>
  );
};

Radio.displayName = ComponentName.Radio;

export const WizRadio = Radio;
