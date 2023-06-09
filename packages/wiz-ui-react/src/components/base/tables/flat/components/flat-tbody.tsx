import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tbody">;

const FlatTbody = ({ children, ...props }: Props) => (
  <tbody {...props}>{children}</tbody>
);

FlatTbody.displayName = ComponentName.FlatTbody;

export const WizFlatTbody = FlatTbody;
