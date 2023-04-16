import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"td">;

const _CardTd = ({ ...props }: Props) => (
  <td className={styles.cardTdStyle} {...props}>
    {props.children}
  </td>
);

_CardTd.displayName = ComponentName.CardTd;

export const WizCardTd = memo(_CardTd);
