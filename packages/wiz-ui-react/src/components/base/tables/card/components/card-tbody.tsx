import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tbody">;

const _CardTbody = ({ ...props }: Props) => (
  <tbody {...props}>{props.children}</tbody>
);

_CardTbody.displayName = ComponentName.CardTbody;

export const WizCardTbody = memo(_CardTbody);
