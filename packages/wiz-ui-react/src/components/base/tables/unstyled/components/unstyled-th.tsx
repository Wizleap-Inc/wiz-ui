import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  width?: string;
  children?: ReactNode;
} & ComponentProps<"th">;

const _UnstyledTh = ({ width = "auto", ...props }: Props) => (
  <th className={styles.unstyledTh} style={{ width }} {...props}>
    {props.children}
  </th>
);

_UnstyledTh.displayName = ComponentName.UnstyledTh;

export const WizUnstyledTh = memo(_UnstyledTh);
