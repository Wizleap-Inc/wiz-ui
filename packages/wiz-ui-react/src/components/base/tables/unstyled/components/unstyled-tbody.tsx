import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tbody">;

const _UnstyledTbody = ({ ...props }: Props) => (
  <tbody {...props}>{props.children}</tbody>
);

_UnstyledTbody.displayName = ComponentName.UnstyledTbody;

export const WizUnstyledTbody = memo(_UnstyledTbody);
