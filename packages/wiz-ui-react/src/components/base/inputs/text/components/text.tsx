import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-input.css";
import clsx from "clsx";
import {
  ChangeEventHandler,
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useContext,
} from "react";

import { TIcon } from "@/components";
import { PrivateBaseInput } from "@/components/base/inputs/base";
import { FormControlContext } from "@/components/custom/form/form-control-context";

type PrivateBaseInputProps = ComponentProps<typeof PrivateBaseInput>;

export type Props = {
  icon?: TIcon;
  onChangeValue?: (value: string) => void;
} & Omit<PrivateBaseInputProps, "type">;

const TextInput = forwardRef(
  (
    { icon: Icon, onChangeValue, onChange, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const formControl = useContext(FormControlContext);

    const computedExpand = props.expand ? "expand" : "default";
    const error = props.error ?? formControl.error;

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      onChange?.(e);
      onChangeValue?.(e.target.value);
    };

    return (
      <div
        className={clsx(
          styles.textInputStyle,
          styles.textInputExpandStyle[computedExpand]
        )}
      >
        {Icon && (
          <div className={styles.textInputIconStyle}>
            <Icon />
          </div>
        )}
        <PrivateBaseInput
          {...props}
          ref={ref}
          error={error}
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
