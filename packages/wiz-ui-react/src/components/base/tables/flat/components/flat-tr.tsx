import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tr">;

const FlatTr = ({ children, ...props }: Props) => (
  <tr {...props}>{children}</tr>
);

FlatTr.displayName = ComponentName.FlatTr;

export const WizFlatTr = FlatTr;
