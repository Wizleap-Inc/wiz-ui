import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type Props = {
  fixed?: boolean;
  width?: string;
  children?: ReactNode;
} & ComponentProps<"table">;

const FlatTable = ({ fixed = false, width, children, ...props }: Props) => {
  return (
    <table
      className={clsx([
        styles.flatTableStyle,
        fixed && styles.flatTableFixedStyle,
      ])}
      style={{ width }}
      {...props}
    >
      {children}
    </table>
  );
};

FlatTable.displayName = ComponentName.FlatTable;

export const WizFlatTable = FlatTable;
