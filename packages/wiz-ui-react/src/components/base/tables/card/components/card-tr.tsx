import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import { ComponentProps, ReactNode } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tr">;

const CardTr = ({ children, ...props }: Props) => (
  <tr className={styles.cardTrStyle} {...props}>
    {children}
  </tr>
);

CardTr.displayName = ComponentName.CardTr;

export const WizCardTr = CardTr;
