import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tbody">;

const _FlatTbody = ({ ...props }: Props) => (
  <tbody {...props}>{props.children}</tbody>
);

_FlatTbody.displayName = ComponentName.FlatTbody;

export const WizFlatTbody = memo(_FlatTbody);
