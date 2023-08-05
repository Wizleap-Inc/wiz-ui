import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/checkbox-input.css";
import { checkboxHoverStyle } from "@wizleap-inc/wiz-ui-styles/bases/checkbox-input.css";
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";

import { WizStack } from "@/components";

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
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const checkboxRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [checkboxWidth, setRadioWidth] = useState<number[]>([]);
  useEffect(() => {
    setRadioWidth(checkboxRefs.current.map((ref) => ref?.clientWidth ?? 0));
  }, [options]);

  return (
    <WizStack gap={gap} direction={direction} wrap>
      {options.map((option, i) => {
        const isChecked = values.includes(option.value);
        const isDisabled = disabled || option.disabled;
        const isFocused = !isDisabled && option.key === focusedKey;
        const isHovered = !isDisabled && option.value === hoveredOption;
        const iconStyle = (() => {
          if (isChecked && isFocused) return "checkedFocused";
          if (isChecked) return "checked";
          if (isFocused) return "focused";
          return "default";
        })();
        return (
          <div
            key={option.key}
            ref={(ref) => (checkboxRefs.current[i] = ref)}
            style={{
              width: checkboxWidth[i],
            }}
          >
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
              onMouseEnter={() => setHoveredOption(option.value)}
              onMouseLeave={() => setHoveredOption(null)}
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
                onBlur={() => {
                  if (!isHovered) setFocusedKey(null);
                }}
              />
              <span className={styles.checkboxIconContainerStyle}>
                {/* FIXME: WizICheck をコピーして使用 https://github.com/Wizleap-Inc/wiz-ui/issues/758 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  width="1em"
                  viewBox="0 0 24 24"
                  className={clsx(
                    styles.checkboxIconBaseStyle,
                    styles.checkboxIconVariantStyle[iconStyle]
                  )}
                >
                  <path d="M9.55 16.975q-.15 0-.288-.05-.137-.05-.287-.175l-4.05-4.05q-.15-.175-.15-.363 0-.187.175-.362.15-.15.35-.15.2 0 .35.15l3.9 3.9 8.8-8.8q.15-.15.35-.15.2 0 .375.15.15.175.15.363 0 .187-.15.362l-8.95 8.95q-.15.125-.287.175-.138.05-.288.05Z" />
                </svg>
              </span>
              <span
                className={clsx(
                  isChecked && styles.checkboxBlockCheckedStyle,
                  strikeThrough &&
                    isChecked &&
                    styles.checkboxLabelStrikeThrough,
                  isHovered && checkboxHoverStyle
                )}
              >
                {option.label}
              </span>
            </label>
          </div>
        );
      })}
    </WizStack>
  );
};

CheckBox.displayName = ComponentName.CheckBox;

export const WizCheckBox = CheckBox;
