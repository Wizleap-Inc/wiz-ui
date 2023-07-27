import { ColorKeys, FontSizeKeys } from "@wizleap-inc/wiz-ui-constants";
import { createContext } from "react";

type FormGroupContextType = {
  labelWidth?: string;
  labelColor?: ColorKeys;
  labelFontSize?: FontSizeKeys;
};

export const FormGroupContext = createContext<FormGroupContextType>({});
