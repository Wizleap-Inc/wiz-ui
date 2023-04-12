import * as styles from "@wizleap-inc/wiz-ui-styles/bases/base-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { clsx } from "clsx";
import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  memo,
  useMemo,
  useState,
} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

type Props = InputProps & {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  type?: "text" | "password";
  width?: string;
  error?: boolean;
  spaceType?: "left" | "right" | "both" | "none";
};

const _PrivateBaseInput = forwardRef(
  (
    {
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
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [hasFocus, setHasFocus] = useState(false);

    const state = useMemo(() => {
      if (error) return "error";
      if (hasFocus) return "active";
      return "default";
    }, [hasFocus, error]);

    return (
      <input
        ref={ref}
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
        onFocus={(e) => {
          setHasFocus(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setHasFocus(false);
          props.onBlur?.(e);
        }}
        onChange={props.onChange}
        value={value}
      />
    );
  }
);

export const PrivateBaseInput = memo(_PrivateBaseInput);
