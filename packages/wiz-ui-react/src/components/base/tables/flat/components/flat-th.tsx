import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type Props = {
  width?: string;
  scope?: "col" | "row";
  children?: ReactNode;
} & ComponentProps<"th">;

const FlatTh = ({
  width = "auto",
  scope = "col",
  children,
  ...props
}: Props) => (
  <th
    className={clsx(styles.flatTh, styles.flatThVariantStyle[scope])}
    style={{ width }}
    {...props}
  >
    {children}
  </th>
);

FlatTh.displayName = ComponentName.FlatTh;

export const WizFlatTh = FlatTh;
