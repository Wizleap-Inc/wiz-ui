import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-area.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { clsx } from "clsx";
import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  memo,
  useState,
} from "react";

import { useFormControl } from "@/hooks/use-form-control-provider";

type Props = {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  rows?: number;
} & ComponentProps<"textarea">;

const _TextArea = forwardRef(
  (
    { id, value, placeholder, disabled, expand, rows = 3, ...props }: Props,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const { isError } = useFormControl();
    const [hasFocus, setHasFocus] = useState(false);
    const state = (() => {
      if (isError) return "error";
      if (hasFocus) return "active";
      return "default";
    })();
    return (
      <textarea
        ref={ref}
        {...props}
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
