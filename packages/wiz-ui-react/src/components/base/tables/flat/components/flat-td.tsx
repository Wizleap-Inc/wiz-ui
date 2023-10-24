import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type Props = {
  align?: "left" | "center" | "right";
  fontSize?: "xs2" | "xs" | "sm" | "md";
  children?: ReactNode;
} & ComponentProps<"td">;

const FlatTd = ({
  className,
  style,
  align = "center",
  fontSize = "sm",
  children,
  ...props
}: Props) => (
  <td
    className={clsx(
      className,
      styles.flatTdStyle,
      styles.flatTdAlignStyle[align]
    )}
    style={{ ...style, fontSize: THEME.fontSize[fontSize] }}
    {...props}
  >
    {children}
  </td>
);

FlatTd.displayName = ComponentName.FlatTd;

export const WizFlatTd = FlatTd;
