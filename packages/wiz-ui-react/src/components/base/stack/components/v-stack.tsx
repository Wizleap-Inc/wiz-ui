import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import { ReactNode, memo } from "react";

import { WizStack } from "./stack";

type Props = {
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: SpacingKeys;
  gx?: SpacingKeys;
  gy?: SpacingKeys;
  p?: SpacingKeys;
  pt?: SpacingKeys;
  pr?: SpacingKeys;
  pb?: SpacingKeys;
  pl?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  m?: SpacingKeys;
  mt?: SpacingKeys;
  mr?: SpacingKeys;
  mb?: SpacingKeys;
  ml?: SpacingKeys;
  mx?: SpacingKeys;
  my?: SpacingKeys;
  width?: string;
  height?: string;
  overflow?: string;
  reverse?: string;
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static";
  children?: ReactNode;
};

const _VStack = ({ ...props }: Props) => {
  return (
    <WizStack direction="vertical" {...props}>
      {props.children}
    </WizStack>
  );
};

export const WizVStack = memo(_VStack);
