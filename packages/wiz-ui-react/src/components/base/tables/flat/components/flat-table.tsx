import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode, memo } from "react";
type Props = {
  fixed?: boolean;
  width?: string;
  children?: ReactNode;
} & ComponentProps<"table">;
const _FlatTable = ({ fixed = false, width, ...props }: Props) => {
  return (
    <table
      className={clsx([
        styles.flatTableStyle,
        fixed && styles.flatTableFixedStyle,
      ])}
      style={{ width }}
      {...props}
    >
      {props.children}
    </table>
  );
};

_FlatTable.displayName = ComponentName.FlatTable;

export const WizFlatTable = memo(_FlatTable);
