import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  fixed?: boolean;
  width?: string;
  children?: ReactNode;
} & ComponentProps<"table">;

const _CardTable = ({ fixed = false, width, ...props }: Props) => {
  return (
    <table
      className={clsx([
        styles.cardTableStyle,
        fixed && styles.cardTableFixedStyle,
      ])}
      style={{ width }}
      {...props}
    >
      {props.children}
    </table>
  );
};

_CardTable.displayName = ComponentName.CardTable;

export const WizCardTable = memo(_CardTable);
