import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"tr">;

const _FlatTr = ({ ...props }: Props) => <tr {...props}>{props.children}</tr>;

_FlatTr.displayName = ComponentName.FlatTr;

export const WizFlatTr = memo(_FlatTr);
