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
  expand?: boolean;
  width?: string;
  autocomplete?: Extract<AutoCompleteKeys, "currentPassword" | "newPassword">;
  error?: boolean;
  onChange: (value: string) => void;
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
      width,
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

    return (
      <div
        className={clsx(
          className,
          styles.passwordStyle,
          styles.passwordExpandStyle[expand ? "expand" : "default"]
        )}
        style={style}
      >
        <PrivateBaseInput
          ref={ref}
          value={value}
          placeholder={placeholder}
          id={id}
          disabled={disabled}
          expand={expand}
          width={width}
          error={isError}
          type={isPasswordVisible ? "text" : "password"}
          autoComplete={autocomplete}
          space-type="right"
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
        <button
          type="button"
          aria-label={ARIA_LABELS.PASSWORD_VISIBLE_TOGGLE}
          className={styles.passwordVisibleIconStyle}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <div
            className={clsx(
              isPasswordVisible && styles.passwordVisibleIconActiveStyle
            )}
            style={{ display: "flex" }}
          >
            <WizIEye />
          </div>
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = ComponentName.PasswordInput;

export const WizPasswordInput = PasswordInput;
