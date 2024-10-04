import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/number-input.css";
import {
  fillStyle,
  fontSizeStyle,
  inputBorderStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ChangeEvent, useRef } from "react";

import { WizIArrowDropDown, WizIArrowDropUp, WizVStack } from "@/components";
import { BaseProps } from "@/types";

type Props = BaseProps & {
  value: number;
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
  const { value, onChange, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStepUp = () => inputRef.current?.stepUp();
  const handleStepDown = () => inputRef.current?.stepDown();

  return (
    <div
      className={clsx(inputBorderStyle["default"])}
      style={{ display: "flex", alignItems: "center", borderColor: "black" }}
    >
      <input
        className={clsx(styles.InputStyle)}
        type="number"
        value={value}
        ref={inputRef}
        onChange={onChange}
        style={{
          width: "50px",
          textAlign: "center",
          margin: "0 10px",
          padding: "5px",
        }}
        {...rest}
      />

      <WizVStack>
        <button
          type="button"
          onClick={handleStepUp}
          className={styles.ButtonStyle}
          aria-label={ARIA_LABELS.YEAR_SELECTOR_NEXT}
        >
          <WizIArrowDropUp
            className={clsx(
              fillStyle["gray.800"],
              fontSizeStyle["xs2"],
              styles.ArrowIconStyle
            )}
          />
        </button>
        <button
          type="button"
          onClick={handleStepDown}
          className={styles.ButtonStyle}
          aria-label={ARIA_LABELS.YEAR_SELECTOR_PREV}
        >
          <WizIArrowDropDown
            className={clsx(
              fillStyle["gray.800"],
              fontSizeStyle["xs2"],
              styles.ArrowIconStyle
            )}
          />
        </button>
      </WizVStack>
    </div>
  );
};

export default NumberInput;

NumberInput.displayName = ComponentName.NumberInput;

export const WizNumberInput = NumberInput;
