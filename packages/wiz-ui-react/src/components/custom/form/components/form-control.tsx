import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { FC, ReactNode, useContext } from "react";

import { WizHStack, WizTag, WizText, WizVStack } from "@/components";

import { FormControlContext } from "./form-control-context";
import { FormGroupContext } from "./form-group-context";

type Props = {
  htmlFor?: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

const FormControl: FC<Props> = ({
  htmlFor,
  label,
  required,
  error,
  children,
}) => {
  const {
    labelWidth = "8rem",
    labelColor,
    labelFontSize,
  } = useContext(FormGroupContext);

  return (
    <FormControlContext.Provider value={{ error: error !== undefined }}>
      <WizVStack>
        <WizHStack>
          <WizHStack width={labelWidth} align="center" gap="xs2">
            <WizText
              as="label"
              htmlFor={htmlFor}
              color={labelColor}
              fontSize={labelFontSize}
            >
              {label}
            </WizText>
            {required && <WizTag fontSize="xs2" label="必須" />}
          </WizHStack>
          <WizVStack>{children}</WizVStack>
        </WizHStack>
        {error && (
          <div style={{ marginInlineStart: labelWidth }}>
            <WizText fontSize="xs2" lineHeight="sm" color="red.800">
              {error}
            </WizText>
          </div>
        )}
      </WizVStack>
    </FormControlContext.Provider>
  );
};

FormControl.displayName = ComponentName.FormControl;

export const WizFormControl = FormControl;
