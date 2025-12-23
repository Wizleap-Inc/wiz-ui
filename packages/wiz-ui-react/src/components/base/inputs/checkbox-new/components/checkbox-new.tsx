import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/checkbox-new.css";
import clsx from "clsx";
import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useMemo,
  useState,
} from "react";

import { WizIcon } from "@/components/base/icon";
import { WizICheckBold } from "@/components/icons";

interface BaseProps extends ComponentPropsWithoutRef<"input"> {
  strikeThrough?: boolean;
  bordered?: boolean;
  error?: boolean;
  children?: ReactNode;
}

interface ControlledProps extends BaseProps {
  checked: boolean;
  defaultChecked?: never;
}

interface UncontrolledProps extends BaseProps {
  checked?: never;
  defaultChecked?: boolean;
}
type Props = ControlledProps | UncontrolledProps;

const CheckboxNew = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      style,
      checked,
      defaultChecked,
      children,
      strikeThrough,
      bordered,
      error,
      onChange,
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] =
      useState(defaultChecked);
    const isControlled = checked !== undefined;
    const actualChecked = isControlled ? checked : uncontrolledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const labelClassName = useMemo(() => {
      const borderedState = (() => {
        if (props.disabled) {
          return "disabled";
        }
        if (error) {
          return "error";
        }
        if (actualChecked) {
          return "checked";
        }
        return "default";
      })();

      return clsx(
        className,
        styles.labelStyle[props.disabled ? "disabled" : "default"],
        strikeThrough && styles.strikeThroughStyle,
        bordered && styles.borderedStyle[borderedState]
      );
    }, [
      actualChecked,
      bordered,
      className,
      error,
      props.disabled,
      strikeThrough,
    ]);
    return (
      <label className={labelClassName} style={style}>
        <input
          {...props}
          ref={ref}
          type="checkbox"
          className={clsx(
            styles.inputStyle,
            styles.inputMarginStyle[bordered ? "bordered" : "default"]
          )}
          {...(isControlled ? { checked } : { defaultChecked })}
          onChange={handleChange}
        />
        <div
          className={clsx(
            styles.iconWrapperStyle,
            styles.inputMarginStyle[bordered ? "bordered" : "default"]
          )}
        >
          {actualChecked && (
            <div className={styles.iconPositionStyle}>
              <WizIcon icon={WizICheckBold} color="white.800" size="md" />
            </div>
          )}
        </div>
        {children}
      </label>
    );
  }
);

CheckboxNew.displayName = ComponentName.CheckBoxNew;

export const WizCheckBoxNew = CheckboxNew;
