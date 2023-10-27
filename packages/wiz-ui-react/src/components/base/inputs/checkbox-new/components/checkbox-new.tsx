import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/checkbox-new.css";
import clsx from "clsx";
import {
  ChangeEvent,
  ChangeEventHandler,
  ComponentProps,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { WizIcon } from "@/components/base/icon";
import { WizICheckBold } from "@/components/icons";
import { BaseProps } from "@/types";

type InputProps = ComponentProps<"input">;

type Props = BaseProps & {
  checked?: boolean;
  value?: InputProps["value"];
  id?: string;
  name?: string;
  disabled?: boolean;
  strikeThrough?: boolean;
  bordered?: boolean;
  error?: boolean;
  children?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxNew = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      style,
      checked,
      children,
      strikeThrough,
      bordered,
      error,
      onChange,
      ...props
    },
    ref
  ) => {
    const isControlled = checked !== undefined;

    const [actualChecked, setActualChecked] = useState(checked);
    useEffect(() => {
      if (isControlled) {
        setActualChecked(checked);
      }
    }, [checked, isControlled]);

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (e) => {
        onChange?.(e);
        if (!isControlled) {
          setActualChecked(e.target.checked);
        }
      },
      [isControlled, onChange]
    );

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
          className={styles.inputStyle}
          checked={actualChecked}
          onChange={handleChange}
        />
        <div className={styles.iconWrapperStyle}>
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
