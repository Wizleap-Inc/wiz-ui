import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { ComponentProps, ReactNode } from "react";

type Props = {
  children?: ReactNode;
} & ComponentProps<"thead">;

const CardThead = ({ children, ...props }: Props) => (
  <thead {...props}>{children}</thead>
);

CardThead.displayName = ComponentName.CardThead;

export const WizCardThead = CardThead;
