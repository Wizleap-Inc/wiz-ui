import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/number-input.css";
import {
  fillStyle,
  fontSizeStyle,
  inputBorderStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ChangeEvent, useRef } from "react";

import {
  WizDivider,
  WizIArrowDropDown,
  WizIArrowDropUp,
  WizVStack,
} from "@/components";
import { BaseProps } from "@/types";

type Props = BaseProps & {
  value: number | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  error?: boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
};

const NumberInput = (props: Props) => {
  const {
    className,
    style,
    value,
    width = "7rem",
    onChange,
    disabled,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerChangeEvent = () => {
    const event = new Event("input", { bubbles: true });
    if (inputRef.current) {
      inputRef.current.dispatchEvent(event);
    }
  };
  const handleStepUp = () => {
    inputRef.current?.stepUp();
    triggerChangeEvent();
  };
  const handleStepDown = () => {
    inputRef.current?.stepDown();
    triggerChangeEvent();
  };

  return (
    <div
      className={clsx(
        styles.container,
        disabled && styles.disabled,
        inputBorderStyle["default"],
        className
      )}
      style={{
        display: "flex",
        width: width,
        ...style,
      }}
    >
      <input
        className={clsx(styles.input)}
        type="number"
        value={value || ""}
        ref={inputRef}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      <WizVStack>
        <button
          type="button"
          onClick={handleStepUp}
          className={styles.button}
          aria-label={ARIA_LABELS.YEAR_SELECTOR_NEXT}
        >
          <WizIArrowDropUp
            className={clsx(
              fillStyle["gray.500"],
              fontSizeStyle["xs2"],
              styles.arrowIcon
            )}
          />
        </button>
        <WizDivider />
        <button
          type="button"
          onClick={handleStepDown}
          className={styles.button}
          aria-label={ARIA_LABELS.YEAR_SELECTOR_PREV}
        >
          <WizIArrowDropDown
            className={clsx(
              fillStyle["gray.500"],
              fontSizeStyle["xs2"],
              styles.arrowIcon
            )}
          />
        </button>
      </WizVStack>
    </div>
  );
};

NumberInput.displayName = ComponentName.NumberInput;

export const WizNumberInput = NumberInput;
