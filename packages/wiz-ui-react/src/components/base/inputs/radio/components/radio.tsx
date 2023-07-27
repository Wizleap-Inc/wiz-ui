import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/radio-input.css";
import clsx from "clsx";
import { FC, useEffect, useId, useRef, useState } from "react";

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
  const [focusedOption, setFocusedOption] = useState<number | null>(null);
  const radiosRef = useRef<Array<HTMLDivElement | null>>([]);
  const [radioWidth, setRadioWidth] = useState<number[]>([]);
  useEffect(() => {
    setRadioWidth(radiosRef.current.map((ref) => ref?.clientWidth ?? 0));
  }, [options]);

  return (
    <div className={styles.radioStyle}>
      <WizStack gap={gap} direction={direction} wrap>
        {options.map((option, i) => {
          const id = `${idPrefix}-${option.value}`;
          const isChecked = value === option.value;
          const isDisabled = disabled || option.disabled;
          const isFocused = focusedOption === option.value;
          const colorStyle = (() => {
            if (isChecked && isFocused) return "checkedFocused";
            if (isChecked) return "checked";
            if (isFocused) return "focused";
            return "default";
          })();
          return (
            <div
              key={id}
              ref={(ref) => {
                radiosRef.current[i] = ref;
              }}
              style={{
                width: radioWidth[i],
              }}
            >
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
                  setFocusedOption(option.value);
                }}
                onBlur={() => {
                  setFocusedOption(null);
                }}
              />
              <label
                className={clsx(
                  styles.radioLabelStyle,
                  isChecked && styles.radioLabelCheckedStyle,
                  isDisabled && styles.radioLabelDisabledStyle,
                  !isDisabled && styles.radioBoldOnHoverStyle,
                  styles.radioLabelColorStyle[colorStyle],
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
