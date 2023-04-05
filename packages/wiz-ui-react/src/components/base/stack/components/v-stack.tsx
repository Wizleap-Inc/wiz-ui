import { memo } from "react";

import { Props as StackProps, WizStack } from "./stack";

export type Props = Omit<StackProps, "direction">;

const _VStack = ({ ...props }: Props) => {
  return (
    <WizStack direction="vertical" {...props}>
      {props.children}
    </WizStack>
  );
};

export const WizVStack = memo(_VStack);
