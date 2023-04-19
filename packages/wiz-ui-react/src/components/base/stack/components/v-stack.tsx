import { memo } from "react";

import { WizStack } from "./stack";
import { StackProps } from "./types";

type Props = Omit<StackProps, "direction">;

const _VStack = ({ ...props }: Props) => {
  return (
    <WizStack direction="vertical" {...props}>
      {props.children}
    </WizStack>
  );
};

export const WizVStack = memo(_VStack);
