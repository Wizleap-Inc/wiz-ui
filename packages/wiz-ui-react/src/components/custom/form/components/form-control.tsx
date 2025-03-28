import { ComponentName, THEME, ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import { borderColorStyle } from "@wizleap-inc/wiz-ui-styles/commons/border-color.css";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/form-control.css";
import clsx from "clsx";
import { FC, ReactNode, useContext, useMemo } from "react";

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
  borderLeft?: boolean;
  borderColor?: ColorKeys;
  labelTagPosition?: "left" | "right";
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
  borderLeft = false,
  borderColor = "green.800",
  labelTagPosition,
}) => {
  const {
    labelWidth = "8rem",
    labelColor,
    labelFontSize,
    labelTagPosition: labelTagPositionContext,
  } = useContext(FormGroupContext);

  const resolvedLabelTagPosition =
    labelTagPosition || labelTagPositionContext || "right";

  const errorLeft = useMemo(() => {
    return direction === "horizontal" ? labelWidth : undefined;
  }, [labelWidth, direction]);

  return (
    <FormControlContext.Provider value={{ error: error !== undefined }}>
      <WizVStack
        nowrap
        style={{
          ...style,
          paddingBottom: error === undefined ? THEME.fontSize.sm : undefined,
        }}
      >
        <WizStack
          className={className}
          direction={direction}
          nowrap
          align={direction === "horizontal" ? "center" : undefined}
        >
          <WizHStack
            width={labelWidth}
            align="center"
            reverse={resolvedLabelTagPosition === "left"}
            justify={resolvedLabelTagPosition === "left" ? "end" : "start"}
            gap="xs"
            my="xs2"
            className={clsx({
              [styles.borderLeftStyle]: borderLeft,
              [borderColorStyle[borderColor]]: borderLeft,
            })}
          >
            <WizText
              as="label"
              htmlFor={htmlFor}
              color={labelColor}
              fontSize={labelFontSize}
              bold={borderLeft}
              className={clsx({
                [styles.borderLeftTextStyle]: borderLeft,
              })}
            >
              {label}
            </WizText>
            {required && <WizTag fontSize="xs2" label="必須" />}
          </WizHStack>
          {children}
        </WizStack>
        <WizText
          fontSize="xs2"
          lineHeight="sm"
          color="red.800"
          style={{ marginInlineStart: errorLeft }}
        >
          {error}
        </WizText>
      </WizVStack>
    </FormControlContext.Provider>
  );
};

FormControl.displayName = ComponentName.FormControl;

export const WizFormControl = FormControl;
