import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/radio-new.css";
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

type InputProps = ComponentProps<"input">;

type Props = {
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

const RadioNew = forwardRef<HTMLInputElement, Props>(
  (
    { checked, strikeThrough, bordered, error, children, onChange, ...props },
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
        styles.labelStyle[props.disabled ? "disabled" : "default"],
        strikeThrough && styles.strikeThroughStyle,
        bordered && styles.borderedStyle[borderedState]
      );
    }, [actualChecked, bordered, error, props.disabled, strikeThrough]);

    return (
      <label className={labelClassName}>
        <input
          {...props}
          ref={ref}
          type="radio"
          className={styles.inputStyle}
          checked={actualChecked}
          onChange={handleChange}
        />
        <div className={styles.markerStyle} />
        {children}
      </label>
    );
  }
);

RadioNew.displayName = ComponentName.RadioNew;

export const WizRadioNew = RadioNew;
