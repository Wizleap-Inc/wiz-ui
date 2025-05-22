import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-area.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef, useContext } from "react";

import { FormControlContext } from "@/components/custom/form/components/form-control-context";
function getInputBorderStyleKey(isError?: boolean) {
  if (isError) return "error";
  return "default";
}

type TextAreaHTMLProps = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "value" | "onChange"
>;

type Props = TextAreaHTMLProps & {
  value: string;
  expand?: boolean;
  error?: boolean;
  resize?: "none" | "both" | "horizontal" | "vertical";
  maxWidth?: string;
  minWidth?: string;
  maxHeight?: string;
  minHeight?: string;
  onChange?: (value: string) => void;
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      className,
      style,
      value,
      expand,
      rows = 3,
      error,
      resize = "none",
      maxWidth,
      minWidth,
      maxHeight,
      minHeight,
      onChange,
      ...props
    },
    ref
  ) => {
    const formControl = useContext(FormControlContext);

    const isError = error || formControl.error;

    return (
      <textarea
        {...props}
        ref={ref}
        value={value}
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
          expand && styles.textAreaExpandStyle,
          inputBorderStyle[getInputBorderStyleKey(isError)]
        )}
        onChange={(e) => onChange?.(e.target.value)}
      />
    );
  }
);

TextArea.displayName = ComponentName.TextArea;

export const WizTextArea = TextArea;
