import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-area.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { forwardRef, useContext, useState } from "react";

import { FormControlContext } from "@/components/custom/form/components/form-control-context";

function getInputBorderStyleKey(isError?: boolean, hasFocus?: boolean) {
  if (isError) return "error";
  if (hasFocus) return "active";
  return "default";
}

type Props = {
  id?: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  rows?: number;
  error?: boolean;
  onChange: (value: string) => void;
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    { id, value, placeholder, disabled, expand, rows = 3, error, onChange },
    ref
  ) => {
    const [hasFocus, setHasFocus] = useState(false);
    const formControl = useContext(FormControlContext);

    const isError = error || formControl.error;

    return (
      <textarea
        ref={ref}
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={clsx(
          styles.textAreaStyle,
          styles.textAreaVariantStyle[disabled ? "disabled" : "default"],
          expand && styles.textAreaExpandStyle,
          inputBorderStyle[getInputBorderStyleKey(isError, hasFocus)]
        )}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
);

TextArea.displayName = ComponentName.TextArea;

export const WizTextArea = TextArea;