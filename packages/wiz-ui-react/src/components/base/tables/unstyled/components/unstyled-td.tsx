import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  align?: "left" | "center" | "right";
  children?: ReactNode;
} & ComponentProps<"td">;

const _UnstyledTd = ({ align = "center", ...props }: Props) => (
  <td
    className={clsx(styles.unstyledTdStyle, styles.unstyledTdAlignStyle[align])}
    {...props}
  >
    {props.children}
  </td>
);

_UnstyledTd.displayName = ComponentName.UnstyledTd;

export const WizUnstyledTd = memo(_UnstyledTd);
