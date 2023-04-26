import { ERROR_MESSAGES } from "@wizleap-inc/wiz-ui-constants";
import { createContext, useContext } from "react";

type TGlobalContext = {
  state: undefined;
};

export const GlobalContext = createContext<TGlobalContext | null>(null);

// export const useGlobalProvider = () => {
//   return {};
// };

export const useGlobal = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) {
    throw new Error(ERROR_MESSAGES.USE_GLOBAL.INVALID_USAGE);
  }
  return ctx;
};
