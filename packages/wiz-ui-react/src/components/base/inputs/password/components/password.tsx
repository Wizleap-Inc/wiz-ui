import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import {
  passwordStyle,
  passwordExpandStyle,
  passwordVisibleIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/password-input.css";
import clsx from "clsx";
import { memo, useState } from "react";
type Props = {
  id?: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  width?: string;
  onChange?: (value: string) => void;
};

const _PasswordInput = ({
  id,
  value,
  placeholder,
  disabled,
  expand,
  width,
  ...props
}: Props) => {
  // const isError = useFormCOntrolProvider()
  const isError = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const computedExpand = expand ? "expand" : "default";

  return (
    <div className={clsx(passwordStyle, passwordExpandStyle[computedExpand])}>
      <input // PrivateBaseInput
        placeholder={placeholder}
        id={id}
        type={isPasswordVisible ? "text" : "password"}
        value={value}
        disabled={disabled}
        width={width}
        onChange={(e) => {
          props.onChange?.(e.target.value);
        }}
        // error={isError}
        // space-type="right"
      />
      <button
        aria-label={ARIA_LABELS.PASSWORD_VISIBLE_TOGGLE}
        className={passwordVisibleIconStyle}
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {/* <WizIEye :class="isPasswordVisible && passwordVisibleIconActiveStyle" />  */}
      </button>
    </div>
  );
};
export const WizPasswordInput = memo(_PasswordInput);
