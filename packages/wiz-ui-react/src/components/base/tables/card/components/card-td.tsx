import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

import { useIsSafari } from "../hooks/use-is-safari";

type Props = {
  children?: ReactNode;
} & ComponentProps<"td">;

const CardTd = ({ className, style, children, ...props }: Props) => {
  const isSafari = useIsSafari();
  return (
    <td
      className={clsx(
        className,
        isSafari ? styles.cardTdOnSafariStyle : styles.cardTdStyle
      )}
      style={style}
      {...props}
    >
      {children}
    </td>
  );
};

CardTd.displayName = ComponentName.CardTd;

export const WizCardTd = CardTd;
