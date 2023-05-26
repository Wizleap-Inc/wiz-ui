import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/radio-input.css";
import clsx from "clsx";
import { memo, useId } from "react";

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

export const _Radio = ({
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
  return (
    <div className={styles.radioStyle}>
      <WizStack gap={gap} direction={direction} wrap>
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
              />
              <label
                className={clsx(
                  styles.radioLabelStyle,
                  isChecked && styles.radioLabelCheckedStyle,
                  isDisabled && styles.radioLabelDisabledStyle,
                  styles.radioLabelColorStyle[
                    isChecked ? "checked" : "default"
                  ],
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

export const WizRadio = memo(_Radio);
