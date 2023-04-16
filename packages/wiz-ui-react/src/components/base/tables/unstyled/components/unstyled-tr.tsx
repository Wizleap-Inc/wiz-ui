import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  divider?: boolean;
  children?: ReactNode;
} & ComponentProps<"tr">;

const _UnstyledTr = ({ divider = false, ...props }: Props) => (
  <tr className={clsx([divider && styles.unstyledTrDividerStyle])} {...props}>
    {props.children}
  </tr>
);

_UnstyledTr.displayName = ComponentName.UnstyledTr;

export const WizUnstyledTr = memo(_UnstyledTr);
