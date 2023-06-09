import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/base-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { clsx } from "clsx";
import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  memo,
  useState,
} from "react";

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
} & ComponentProps<"input">;

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

    const state = (() => {
      if (error) return "error";
      if (hasFocus) return "active";
      return "default";
    })();

    return (
      <input
        ref={ref}
        {...props}
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

_PrivateBaseInput.displayName = ComponentName.BaseInput;

export const PrivateBaseInput = memo(_PrivateBaseInput);
