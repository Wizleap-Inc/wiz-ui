import { memo } from "react";

import { WizStack } from "./stack";
import { StackProps } from "./types";

type Props = Omit<StackProps, "direction">;

const _HStack = ({ ...props }: Props) => {
  return (
    <WizStack direction="horizontal" {...props}>
      {props.children}
    </WizStack>
  );
};

export const WizHStack = memo(_HStack);
