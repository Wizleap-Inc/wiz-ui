import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tbody">;

const CardTbody = ({ children, ...props }: Props) => (
  <tbody {...props}>{children}</tbody>
);

CardTbody.displayName = ComponentName.CardTbody;

export const WizCardTbody = CardTbody;
