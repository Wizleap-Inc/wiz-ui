import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-area.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { forwardRef, useContext } from "react";

import { FormControlContext } from "@/components/custom/form/components/form-control-context";
import { BaseProps } from "@/types";
function getInputBorderStyleKey(isError?: boolean) {
  if (isError) return "error";
  return "default";
}

type Props = BaseProps & {
  id?: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  rows?: number;
  error?: boolean;
  resize?: "none" | "both" | "horizontal" | "vertical";
  maxWidth?: string;
  minWidth?: string;
  maxHeight?: string;
  minHeight?: string;
  onChange: (value: string) => void;
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      className,
      style,
      id,
      value,
      placeholder,
      disabled,
      expand,
      rows = 3,
      error,
      resize = "none",
      maxWidth,
      minWidth,
      maxHeight,
      minHeight,
      onChange,
    },
    ref
  ) => {
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
        style={{
          ...style,
          resize,
          maxWidth,
          minWidth,
          maxHeight,
          minHeight,
        }}
        className={clsx(
          className,
          styles.textAreaStyle,
          styles.textAreaVariantStyle[disabled ? "disabled" : "default"],
          expand && styles.textAreaExpandStyle,
          inputBorderStyle[getInputBorderStyleKey(isError)]
        )}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
);

TextArea.displayName = ComponentName.TextArea;

export const WizTextArea = TextArea;
