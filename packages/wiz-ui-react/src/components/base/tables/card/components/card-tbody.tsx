import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tbody">;

const _CardTBody = ({ ...props }: Props) => (
  <tbody {...props}>{props.children}</tbody>
);

_CardTBody.displayName = ComponentName.CardTbody;

export const WizCardTBody = memo(_CardTBody);
