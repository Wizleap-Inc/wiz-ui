import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import { ComponentProps, ReactNode } from "react";

import { useIsSafari } from "../hooks/use-is-safari";

type Props = {
  children?: ReactNode;
} & ComponentProps<"td">;

const CardTd = ({ children, ...props }: Props) => {
  const isSafari = useIsSafari();
  return (
    <td
      className={isSafari ? styles.cardTdOnSafariStyle : styles.cardTdStyle}
      {...props}
    >
      {children}
    </td>
  );
};

CardTd.displayName = ComponentName.CardTd;

export const WizCardTd = CardTd;
