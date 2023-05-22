import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { unstyledTheadDividerStyle } from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type Props = {
  divider?: boolean;
  children?: ReactNode;
} & ComponentProps<"thead">;

const UnstyledThead = ({ divider = false, children, ...props }: Props) => (
  <thead className={clsx(divider && unstyledTheadDividerStyle)} {...props}>
    {children}
  </thead>
);

UnstyledThead.displayName = ComponentName.UnstyledThead;

export const WizUnstyledThead = UnstyledThead;
