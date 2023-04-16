import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  width?: string;
  scope?: "col" | "row";
  children?: ReactNode;
} & ComponentProps<"th">;

const _FlatTh = ({ width = "auto", scope = "col", ...props }: Props) => (
  <th
    className={clsx(styles.flatTh, styles.flatThVariantStyle[scope])}
    style={{ width }}
    {...props}
  >
    {props.children}
  </th>
);

_FlatTh.displayName = ComponentName.FlatTh;

export const WizFlatTh = memo(_FlatTh);
