import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

import { useIsSafari } from "../hooks/use-is-safari";

type Props = {
  fixed?: boolean;
  width?: string;
  children?: ReactNode;
} & ComponentProps<"table">;

const CardTable = ({
  className,
  style,
  fixed = false,
  width,
  children,
  ...props
}: Props) => {
  const isSafari = useIsSafari();
  return (
    <table
      className={clsx(
        className,
        isSafari ? styles.cardTableOnSafariStyle : styles.cardTableStyle,
        fixed && styles.cardTableFixedStyle
      )}
      style={{ ...style, width }}
      {...props}
    >
      {children}
    </table>
  );
};

CardTable.displayName = ComponentName.CardTable;

export const WizCardTable = CardTable;
