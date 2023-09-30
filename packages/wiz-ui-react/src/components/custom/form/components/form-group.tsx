import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
  SpacingKeys,
} from "@wizleap-inc/wiz-ui-constants";
import { FC, ReactNode } from "react";

import { WizVStack } from "@/components";
import { BaseProps } from "@/types";

import { FormGroupContext } from "./form-group-context";

type Props = BaseProps & {
  labelWidth?: string;
  labelColor?: ColorKeys;
  labelFontSize?: FontSizeKeys;
  gap?: SpacingKeys;
  children: ReactNode;
};

const FormGroup: FC<Props> = ({
  className,
  style,
  labelWidth,
  labelColor = "gray.900",
  labelFontSize = "md",
  gap = "md",
  children,
}) => {
  return (
    <FormGroupContext.Provider
      value={{
        labelWidth,
        labelColor,
        labelFontSize,
      }}
    >
      <WizVStack className={className} style={style} gap={gap}>
        {children}
      </WizVStack>
    </FormGroupContext.Provider>
  );
};

FormGroup.displayName = ComponentName.FormGroup;

export const WizFormGroup = FormGroup;
