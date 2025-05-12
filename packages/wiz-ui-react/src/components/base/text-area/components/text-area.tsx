import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-area.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef, useContext } from "react";

import { FormControlContext } from "@/components/custom/form/components/form-control-context";
import { BaseProps } from "@/types";
function getInputBorderStyleKey(isError?: boolean) {
  if (isError) return "error";
  return "default";
}

type Props = BaseProps & {
  value: string;
  expand?: boolean;
  error?: boolean;
  resize?: "none" | "both" | "horizontal" | "vertical";
  maxWidth?: string;
  minWidth?: string;
  maxHeight?: string;
  minHeight?: string;
  onChange?: (value: string) => void;
} & Omit<
    ComponentPropsWithoutRef<"textarea">,
    "onChange" | "style" | "className"
  >;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      className,
      style,
      expand,
      error,
      resize = "none",
      maxWidth,
      minWidth,
      maxHeight,
      minHeight,
      onChange,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const formControl = useContext(FormControlContext);

    const isError = error || formControl.error;

    return (
      <textarea
        ref={ref}
        {...props}
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
