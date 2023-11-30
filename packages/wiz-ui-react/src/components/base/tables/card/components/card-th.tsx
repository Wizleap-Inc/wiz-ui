import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

import { useIsSafari } from "../hooks/use-is-safari";

type Props = {
  align?: "left" | "center" | "right";
  width?: string;
  children?: ReactNode;
} & ComponentProps<"th">;

const CardTh = ({
  className,
  style,
  width = "auto",
  align = "center",
  children,
  ...props
}: Props) => {
  const isSafari = useIsSafari();
  return (
    <th
      className={clsx(
        className,
        styles.cardTableAlignStyle[align],
        isSafari ? styles.cardThOnSafariStyle : styles.cardThStyle
      )}
      style={{ ...style, width }}
      {...props}
    >
      {children}
    </th>
  );
};

CardTh.displayName = ComponentName.CardTh;

export const WizCardTh = CardTh;
