import { createContext } from "react";

type FormControlContextType = {
  error?: boolean;
};

export const FormControlContext = createContext<FormControlContextType>({});
