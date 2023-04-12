import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-area.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { clsx } from "clsx";
import {
  ForwardedRef,
  TextareaHTMLAttributes,
  forwardRef,
  memo,
  useMemo,
  useState,
} from "react";

import { useFormControl } from "@/hooks/use-form-control-provider";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = TextAreaProps & {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  rows?: number;
};

const _TextArea = forwardRef(
  (
    { id, value, placeholder, disabled, expand, rows = 3, ...props }: Props,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const { isError } = useFormControl();
    const [hasFocus, setHasFocus] = useState(false);
    const state = useMemo(() => {
      if (isError) return "error";
      if (hasFocus) return "active";
      return "default";
    }, [isError, hasFocus]);
    return (
      <textarea
        ref={ref}
        value={value}
        placeholder={placeholder}
        id={id}
        disabled={disabled}
        rows={rows}
        className={clsx(
          styles.textAreaStyle,
          styles.textAreaVariantStyle[disabled ? "disabled" : "default"],
          expand && styles.textAreaExpandStyle,
          inputBorderStyle[state]
        )}
        onFocus={(e) => {
          setHasFocus(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setHasFocus(false);
          props.onBlur?.(e);
        }}
        onChange={(e) => props.onChange?.(e)}
      />
    );
  }
);

export const WizTextArea = memo(_TextArea);
