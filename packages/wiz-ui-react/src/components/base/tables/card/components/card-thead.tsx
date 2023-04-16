import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"thead">;

const _CardThead = ({ ...props }: Props) => (
  <thead {...props}>{props.children}</thead>
);

_CardThead.displayName = ComponentName.CardThead;

export const WizCardThead = memo(_CardThead);
