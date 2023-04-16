import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tbody">;

const _UnstyledTBody = ({ ...props }: Props) => (
  <tbody {...props}>{props.children}</tbody>
);

_UnstyledTBody.displayName = ComponentName.UnstyledTbody;

export const WizUnstyledTBody = memo(_UnstyledTBody);
