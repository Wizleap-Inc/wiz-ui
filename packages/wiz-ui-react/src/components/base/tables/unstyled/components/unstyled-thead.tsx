import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { unstyledTheadDividerStyle } from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import clsx from "clsx";
import { ComponentProps, ReactNode, memo } from "react";

type Props = {
  divider?: boolean;
  children?: ReactNode;
} & ComponentProps<"thead">;

const _UnstyledThead = ({ divider = false, ...props }: Props) => (
  <thead className={clsx([divider && unstyledTheadDividerStyle])} {...props}>
    {props.children}
  </thead>
);

_UnstyledThead.displayName = ComponentName.UnstyledThead;

export const WizUnstyledThead = memo(_UnstyledThead);
