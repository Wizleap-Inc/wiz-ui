import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"thead">;

const _FlatThead = ({ ...props }: Props) => (
  <thead {...props}>{props.children}</thead>
);

_FlatThead.displayName = ComponentName.FlatThead;

export const WizFlatThead = memo(_FlatThead);
