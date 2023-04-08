import * as styles from "@wizleap-inc/wiz-ui-styles/bases/base-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { clsx } from "clsx";
import { memo, useMemo, useState } from "react";

type Props = {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  type?: "text" | "password";
  width?: string;
  error?: boolean;
  spaceType?: "left" | "right" | "both" | "none";
  onChange: (value: string) => void;
};

const _PrivateBaseInput = ({
  id,
  value,
  placeholder,
  disabled,
  expand,
  type,
  width = "10rem",
  error,
  spaceType = "none",
  ...props
}: Props) => {
  const [hasFocus, setHasFocus] = useState(false);

  const state = useMemo(() => {
    if (error) return "error";
    if (hasFocus) return "active";
    return "default";
  }, [hasFocus, error]);

  return (
    <input
      className={clsx(
        styles.baseInputStyle,
        styles.baseInputPaddingStyle[spaceType],
        disabled && styles.baseInputDisabledStyle,
        inputBorderStyle[state]
      )}
      style={{ width: expand ? "100%" : width }}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      id={id}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
      onChange={(e) => props.onChange(e.target.value)}
      value={value}
    />
  );
};

export const PrivateBaseInput = memo(_PrivateBaseInput);
