import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type Props = {
  fixed?: boolean;
  width?: string;
  children?: ReactNode;
} & ComponentProps<"table">;

const CardTable = ({ fixed = false, width, children, ...props }: Props) => {
  return (
    <table
      className={clsx(
        styles.cardTableStyle,
        fixed && styles.cardTableFixedStyle
      )}
      style={{ width }}
      {...props}
    >
      {children}
    </table>
  );
};

CardTable.displayName = ComponentName.CardTable;

export const WizCardTable = CardTable;
