import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-area.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { memo, useMemo, useState } from "react";

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
  // TODO : useFormControlProvider
  const [hasFocus, setHasFocus] = useState(false);
  const state = useMemo<"default" | "active" | "error">(() => {
    if (hasFocus) return "active";
    return "default";
  }, [hasFocus]);

  return (
    <textarea
      value={value}
      placeholder={placeholder}
      id={id}
      disabled={disabled}
      rows={rows}
      className={`
        ${styles.textAreaStyle} ,
        ${styles.textAreaVariantStyle[disabled ? "disabled" : "default"]}
        ${expand && styles.textAreaExpandStyle}
        ${inputBorderStyle[state]} `}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

export const WizTextArea = memo(_TextArea);
