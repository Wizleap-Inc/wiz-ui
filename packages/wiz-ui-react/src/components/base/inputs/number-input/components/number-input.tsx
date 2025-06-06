import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/number-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { useContext, useRef, useState } from "react";

import {
  WizDivider,
  WizIArrowDropDown,
  WizIArrowDropUp,
  WizVStack,
} from "@/components";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";
import { BaseProps } from "@/types";

type Props = BaseProps & {
  value?: number;
  onChange?: (e: number | undefined) => void;
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
    error,
    value,
    width = "7rem",
    onChange,
    disabled,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const formControl = useContext(FormControlContext);

  const isError = error || formControl.error;

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

  const [isFocused, setIsFocused] = useState(false);
  const borderStyle = (() => {
    if (isError) return "error";
    if (isFocused) return "active";
    return "default";
  })();
  return (
    <div
      className={clsx(
        styles.container,
        inputBorderStyle[borderStyle],
        className
      )}
      style={{
        display: "flex",
        width: width,
        ...style,
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <input
        className={clsx(styles.input)}
        type="number"
        value={value}
        ref={inputRef}
        onChange={(e) => {
          onChange?.(
            isNaN(e.currentTarget.valueAsNumber)
              ? undefined
              : e.currentTarget.valueAsNumber
          );
        }}
        disabled={disabled}
        {...rest}
      />
      <WizVStack justify="center" nowrap>
        <button
          type="button"
          onClick={handleStepUp}
          className={styles.button}
          disabled={disabled}
        >
          <WizIArrowDropUp className={styles.arrowIcon} />
        </button>
        <WizDivider />
        <button
          type="button"
          onClick={handleStepDown}
          className={styles.button}
          disabled={disabled}
        >
          <WizIArrowDropDown className={styles.arrowIcon} />
        </button>
      </WizVStack>
    </div>
  );
};

NumberInput.displayName = ComponentName.NumberInput;

export const WizNumberInput = NumberInput;
