import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tbody">;

const _FlatTBody = ({ ...props }: Props) => (
  <tbody {...props}>{props.children}</tbody>
);

_FlatTBody.displayName = ComponentName.FlatTbody;

export const WizFlatTBody = memo(_FlatTBody);
