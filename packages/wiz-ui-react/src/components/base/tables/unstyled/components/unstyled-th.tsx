import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type Props = {
  width?: string;
  divider?: boolean;
  children?: ReactNode;
} & ComponentProps<"th">;

const UnstyledTh = ({
  className,
  style,
  width = "auto",
  divider,
  children,
  ...props
}: Props) => (
  <th
    className={clsx(
      className,
      styles.unstyledTh,
      divider && styles.unstyledThDividerYStyle
    )}
    style={{ ...style, width }}
    {...props}
  >
    {children}
  </th>
);

UnstyledTh.displayName = ComponentName.UnstyledTh;

export const WizUnstyledTh = UnstyledTh;
