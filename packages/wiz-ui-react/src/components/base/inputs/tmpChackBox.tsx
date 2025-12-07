import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/checkbox-new.css";
import clsx from "clsx";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useMemo,
  useState,
  ChangeEvent,
} from "react";

import { WizIcon } from "@/components/base/icon";
import { WizICheckBold } from "@/components/icons";

type InputProps = ComponentPropsWithoutRef<"input">;

type Props = InputProps & {
  strikeThrough?: boolean;
  bordered?: boolean;
  error?: boolean;
  children?: ReactNode;
};

/**
 * checkedがある
 * - 制御コンポーネントとして動作
 * - labelの表示は、checkedの値に従う
 * checkedがない
 * - 非制御コンポーネントとして動作
 * - defaultCheckedの値で初期化し、その後は内部状態でcheckedを管理しlabelへの表示を制御する
 * - labelの表示は、内部状態のcheckedの値に従う
 */

const CheckboxNewTmp = forwardRef<HTMLInputElement, Props>(
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
    // 制御コンポーネント（checked指定）か非制御コンポーネント（defaultChecked指定）かを判定
    const isControlled = checked !== undefined;

    // 非制御コンポーネントの場合、内部で状態を管理
    const [internalChecked, setInternalChecked] = useState(
      defaultChecked ?? false
    );

    // 表示用のchecked値を決定
    const displayChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
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
        if (displayChecked) {
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
      displayChecked,
      bordered,
      className,
      error,
      props.disabled,
      strikeThrough,
    ]);

    const inputProps = isControlled
      ? { checked: displayChecked }
      : { defaultChecked };

    return (
      <label className={labelClassName} style={style}>
        <input
          {...props}
          {...inputProps}
          ref={ref}
          type="checkbox"
          className={clsx(
            styles.inputStyle,
            styles.inputMarginStyle[bordered ? "bordered" : "default"]
          )}
          onChange={handleChange}
        />
        <div
          className={clsx(
            styles.iconWrapperStyle,
            styles.inputMarginStyle[bordered ? "bordered" : "default"]
          )}
        >
          {displayChecked && (
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

CheckboxNewTmp.displayName = ComponentName.CheckBoxNew;

export const WizCheckBoxNewTmp = CheckboxNewTmp;
