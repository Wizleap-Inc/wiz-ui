import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type Props = {
  align?: "left" | "center" | "right";
  children?: ReactNode;
} & ComponentProps<"td">;

const FlatTd = ({ align = "center", children, ...props }: Props) => (
  <td
    className={clsx(styles.flatTdStyle, styles.flatTdAlignStyle[align])}
    {...props}
  >
    {children}
  </td>
);

FlatTd.displayName = ComponentName.FlatTd;

export const WizFlatTd = FlatTd;
