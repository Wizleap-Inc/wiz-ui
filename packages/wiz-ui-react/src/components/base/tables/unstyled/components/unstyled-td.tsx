import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type Props = {
  align?: "left" | "center" | "right";
  children?: ReactNode;
} & ComponentProps<"td">;

const UnstyledTd = ({ align = "center", children, ...props }: Props) => (
  <td
    className={clsx(styles.unstyledTdStyle, styles.unstyledTdAlignStyle[align])}
    {...props}
  >
    {children}
  </td>
);

UnstyledTd.displayName = ComponentName.UnstyledTd;

export const WizUnstyledTd = UnstyledTd;
