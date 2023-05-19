import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import { ComponentProps, ReactNode } from "react";

type Props = {
  width?: string;
  children?: ReactNode;
} & ComponentProps<"th">;

const UnstyledTh = ({ width = "auto", children, ...props }: Props) => (
  <th className={styles.unstyledTh} style={{ width }} {...props}>
    {children}
  </th>
);

UnstyledTh.displayName = ComponentName.UnstyledTh;

export const WizUnstyledTh = UnstyledTh;
