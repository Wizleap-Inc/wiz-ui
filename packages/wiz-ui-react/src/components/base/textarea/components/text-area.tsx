import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-area.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { clsx } from "clsx";
import { memo, useMemo, useState } from "react";

import { useFormControl } from "@/hooks/use-form-control-provider";

export type Props = {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  rows?: number;
  onChange: (value: string) => void;
};

const _TextArea = ({
  id,
  value,
  placeholder,
  disabled,
  expand,
  rows = 3,
  ...props
}: Props) => {
  const { isError } = useFormControl();
  const [hasFocus, setHasFocus] = useState(false);
  const state = useMemo(() => {
    if (isError) return "error";
    if (hasFocus) return "active";
    return "default";
  }, [isError, hasFocus]);

  return (
    <textarea
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
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

export const WizTextArea = memo(_TextArea);
