import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/number-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { useContext, useRef, useState } from "react";

import {
  WizDivider,
  WizIArrowDropDown,
  WizIArrowDropUp,
  WizIcon,
  WizVStack,
} from "@/components";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";
import { BaseProps } from "@/types";

type Props = BaseProps & {
  value: number | null;
  onChange: (e: number | null) => void;
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
        disabled && styles.disabled,
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
        value={value === null ? "" : value}
        ref={inputRef}
        onChange={(e) => onChange(e.currentTarget.valueAsNumber)}
        disabled={disabled}
        {...rest}
      />
      <WizVStack>
        <button
          type="button"
          onClick={handleStepUp}
          className={styles.button}
          disabled={disabled}
        >
          <WizIcon
            className={styles.arrowIcon}
            icon={WizIArrowDropUp}
            size="xs2"
            color="inherit"
          />
        </button>
        <WizDivider />
        <button
          type="button"
          onClick={handleStepDown}
          className={styles.button}
          disabled={disabled}
        >
          <WizIcon
            className={styles.arrowIcon}
            icon={WizIArrowDropDown}
            size="xs2"
            color="inherit"
          />
        </button>
      </WizVStack>
    </div>
  );
};

NumberInput.displayName = ComponentName.NumberInput;

export const WizNumberInput = NumberInput;
