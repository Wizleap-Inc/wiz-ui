import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tr">;

const _CardTr = ({ ...props }: Props) => (
  <tr className={styles.cardTrStyle} {...props}>
    {props.children}
  </tr>
);

_CardTr.displayName = ComponentName.CardTr;

export const WizCardTr = memo(_CardTr);
