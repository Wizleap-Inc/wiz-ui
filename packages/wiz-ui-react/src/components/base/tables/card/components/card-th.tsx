import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import { ComponentProps, ReactNode } from "react";

type Props = {
  width?: string;
  children?: ReactNode;
} & ComponentProps<"th">;

const CardTh = ({ width = "auto", children, ...props }: Props) => (
  <th className={styles.cardThStyle} style={{ width }} {...props}>
    {children}
  </th>
);

CardTh.displayName = ComponentName.CardTh;

export const WizCardTh = CardTh;
