import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import { ComponentProps, ReactNode } from "react";

import { useIsSafari } from "../hooks/use-is-safari";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tr">;

const CardTr = ({ children, ...props }: Props) => {
  const isSafari = useIsSafari();
  return (
    <tr
      className={isSafari ? styles.cardTrOnSafariStyle : styles.cardTrStyle}
      {...props}
    >
      {children}
    </tr>
  );
};

CardTr.displayName = ComponentName.CardTr;

export const WizCardTr = CardTr;
