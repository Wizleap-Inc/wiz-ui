import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  align?: "left" | "center" | "right";
  children?: ReactNode;
} & ComponentProps<"td">;

const _FlatTd = ({ align = "center", ...props }: Props) => (
  <td
    className={clsx(styles.flatTdStyle, styles.flatTdAlignStyle[align])}
    {...props}
  >
    {props.children}
  </td>
);

_FlatTd.displayName = ComponentName.FlatTd;

export const WizFlatTd = memo(_FlatTd);
