import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text-input.css";
import clsx from "clsx";
import { memo, useMemo } from "react";

// import { useFormControl } from "@/hooks/use-form-control-provider";

export type Props = {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  expand?: boolean;
  // icon ?: TIcon;
  onChange: (value: string) => void;
};

const _TextInput = ({
  id,
  value,
  placeholder,
  disabled = false,
  width,
  expand,
  // icon,
  ...props
}: Props) => {
  // const { isError } = useFormControl();
  const isError = false;

  const computedExpand = useMemo(() => {
    return expand ? "expand" : "default";
  }, [expand]);

  return (
    <div
      className={clsx(
        styles.textInputStyle,
        styles.textInputExpandStyle[computedExpand]
      )}
    >
      {/* icon */}
      {/* PrivateBaseInput */}
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        width={width}
        type="text"
        // error={isError}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export const WizTextInput = memo(_TextInput);
