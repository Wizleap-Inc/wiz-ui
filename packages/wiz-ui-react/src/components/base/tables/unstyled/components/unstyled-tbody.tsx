import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tbody">;

const UnstyledTbody = ({ children, ...props }: Props) => (
  <tbody {...props}>{children}</tbody>
);

UnstyledTbody.displayName = ComponentName.UnstyledTbody;

export const WizUnstyledTbody = UnstyledTbody;
