import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import { FC, ReactNode, useContext } from "react";

import { WizHStack, WizStack, WizTag, WizText, WizVStack } from "@/components";
import { BaseProps } from "@/types";

import { FormControlContext } from "./form-control-context";
import { FormGroupContext } from "./form-group-context";

type Props = BaseProps & {
  htmlFor?: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  direction?: "horizontal" | "vertical";
};

const FormControl: FC<Props> = ({
  className,
  style,
  htmlFor,
  label,
  required,
  error,
  direction = "horizontal",
  children,
}) => {
  const {
    labelWidth = "8rem",
    labelColor,
    labelFontSize,
  } = useContext(FormGroupContext);

  return (
    <FormControlContext.Provider value={{ error: error !== undefined }}>
      <WizStack
        className={className}
        direction={direction}
        align={direction === "horizontal" ? "center" : undefined}
        style={{
          ...style,
          paddingBottom: `calc(${THEME.spacing.xs} + ${THEME.fontSize.sm})`,
        }}
      >
        <WizHStack width={labelWidth} align="center" gap="xs2" py="xs2">
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
        <WizVStack position="relative">
          {children}
          <WizText
            fontSize="xs2"
            lineHeight="sm"
            color="red.800"
            style={{
              position: "absolute",
              bottom: 0,
              transform: "translateY(100%)",
            }}
          >
            <div style={{ padding: `${THEME.spacing.xs2} 0` }}>{error}</div>
          </WizText>
        </WizVStack>
      </WizStack>
    </FormControlContext.Provider>
  );
};

FormControl.displayName = ComponentName.FormControl;

export const WizFormControl = FormControl;
