import {
  ARIA_LABELS,
  AutoCompleteKeys,
  ComponentName,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/password-input.css";
import clsx from "clsx";
import { ComponentProps, forwardRef, useContext, useState } from "react";

import { WizIEye } from "@/components";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";
import { BaseProps } from "@/types";

import { PrivateBaseInput } from "../../base";

type PrivateBaseInputProps = ComponentProps<typeof PrivateBaseInput>;
type Props = BaseProps & {
  id?: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  /**
   * @deprecated このプロパティは将来のバージョンで削除される予定です。代わりに `width="100%"` を使用してください。
   */
  expand?: boolean;
  width?: string;
  autocomplete?: Extract<AutoCompleteKeys, "currentPassword" | "newPassword">;
  error?: boolean;
  onChange?: (value: string) => void;
} & Omit<PrivateBaseInputProps, "onChange">;

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      style,
      id,
      value,
      placeholder,
      disabled,
      expand,
      width = "fit-content",
      autocomplete = "off",
      error,
      onChange,
      ...props
    },
    ref
  ) => {
    const formControl = useContext(FormControlContext);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isError = error || formControl.error;

    const computedWidth = expand ? "100%" : width;

    return (
      <div
        className={clsx(className, styles.passwordStyle)}
        style={{ ...style, width: computedWidth }}
      >
        <PrivateBaseInput
          ref={ref}
          value={value}
          placeholder={placeholder}
          id={id}
          disabled={disabled}
          expand={expand}
          width="100%"
          error={isError}
          type={!disabled && isPasswordVisible ? "text" : "password"}
          autoComplete={autocomplete}
          spaceType="right"
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
        />
        <button
          type="button"
          aria-label={ARIA_LABELS.PASSWORD_VISIBLE_TOGGLE}
          className={styles.passwordVisibleIconStyle}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          disabled={disabled}
        >
          <WizIEye
            className={clsx(
              !disabled &&
                isPasswordVisible &&
                styles.passwordVisibleIconActiveStyle
            )}
          />
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = ComponentName.PasswordInput;

export const WizPasswordInput = PasswordInput;
