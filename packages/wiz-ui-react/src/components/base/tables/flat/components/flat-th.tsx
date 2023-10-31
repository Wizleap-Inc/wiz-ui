import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type Props = {
  width?: string;
  scope?: "col" | "row";
  fontSize?: "xs2" | "xs" | "sm" | "md";
  children?: ReactNode;
} & ComponentProps<"th">;

const FlatTh = ({
  className,
  style,
  width = "auto",
  scope = "col",
  fontSize = "sm",
  children,
  ...props
}: Props) => (
  <th
    className={clsx(className, styles.flatTh, styles.flatThVariantStyle[scope])}
    style={{ ...style, width, fontSize: THEME.fontSize[fontSize] }}
    {...props}
  >
    {children}
  </th>
);

FlatTh.displayName = ComponentName.FlatTh;

export const WizFlatTh = FlatTh;
