import {
  ARIA_LABELS,
  AutoCompleteKeys,
  ComponentName,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/password-input.css";
import clsx from "clsx";
import { forwardRef, useContext, useState } from "react";

import { WizIEye } from "@/components";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";

import { PrivateBaseInput } from "../../base";

type Props = {
  id?: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  width?: string;
  autocomplete?: Extract<AutoCompleteKeys, "currentPassword" | "newPassword">;
  error?: boolean;
  onChange: (value: string) => void;
};

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      value,
      placeholder,
      disabled,
      expand,
      width,
      autocomplete = "off",
      error,
      onChange,
    },
    ref
  ) => {
    const formControl = useContext(FormControlContext);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isError = error || formControl.error;

    return (
      <div
        className={clsx(
          styles.passwordStyle,
          styles.passwordExpandStyle[expand ? "expand" : "default"]
        )}
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
        />
        <button
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
