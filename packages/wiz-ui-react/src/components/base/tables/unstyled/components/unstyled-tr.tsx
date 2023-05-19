import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type Props = {
  divider?: boolean;
  children?: ReactNode;
} & ComponentProps<"tr">;

const UnstyledTr = ({ divider = false, children, ...props }: Props) => (
  <tr className={clsx([divider && styles.unstyledTrDividerStyle])} {...props}>
    {children}
  </tr>
);

UnstyledTr.displayName = ComponentName.UnstyledTr;

export const WizUnstyledTr = UnstyledTr;
