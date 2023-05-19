import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"thead">;

const FlatThead = ({ children, ...props }: Props) => (
  <thead {...props}>{children}</thead>
);

FlatThead.displayName = ComponentName.FlatThead;

export const WizFlatThead = FlatThead;
