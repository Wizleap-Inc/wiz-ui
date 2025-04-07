import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-input.css";
import clsx from "clsx";
import {
  ChangeEventHandler,
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useCallback,
  useContext,
} from "react";

import { TIcon } from "@/components";
import { PrivateBaseInput } from "@/components/base/inputs/base";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";
import { BaseProps } from "@/types";
type PrivateBaseInputProps = ComponentProps<typeof PrivateBaseInput>;

type Props = BaseProps & {
  icon?: TIcon;
  onChangeValue?: (value: string) => void;
} & Omit<PrivateBaseInputProps, "type">;

const TextInput = forwardRef(
  (
    {
      className,
      style,
      icon: Icon,
      onChangeValue,
      onChange,
      error,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const formControl = useContext(FormControlContext);

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (e) => {
        onChange?.(e);
        onChangeValue?.(e.target.value);
      },
      [onChange, onChangeValue]
    );

    const computedWidth = props.expand ? "100%" : props.width || "10em";

    return (
      <div
        className={clsx(className, styles.textInputStyle)}
        style={{ ...style, width: computedWidth }}
      >
        {Icon && (
          <div className={styles.textInputIconStyle}>
            <Icon />
          </div>
        )}
        <PrivateBaseInput
          {...props}
          ref={ref}
          width="100%"
          error={error ?? formControl.error}
          type="text"
          onChange={handleChange}
          spaceType={Icon ? "left" : "none"}
          autoComplete="autocomplete"
        />
      </div>
    );
  }
);

TextInput.displayName = ComponentName.TextInput;

export const WizTextInput = TextInput;
