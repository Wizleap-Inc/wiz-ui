import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  width?: string;
  colSpan?: number;
  children?: ReactNode;
} & ComponentProps<"th">;

const _CardTh = ({ width = "auto", colSpan, ...props }: Props) => (
  <th
    className={styles.cardThStyle}
    style={{ width }}
    colSpan={colSpan}
    {...props}
  >
    {props.children}
  </th>
);

_CardTh.displayName = ComponentName.CardTh;

export const WizCardTh = memo(_CardTh);
