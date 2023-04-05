import { memo } from "react";

import { Props as StackProps, WizStack } from "./stack";

export type Props = Omit<StackProps, "direction">;

const _HStack = ({ ...props }: Props) => {
  return (
    <WizStack direction="horizontal" {...props}>
      {props.children}
    </WizStack>
  );
};

export const WizHStack = memo(_HStack);
