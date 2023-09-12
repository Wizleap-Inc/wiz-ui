import { createContext, useContext } from "react";

type SnackbarOptionsType = {
  expand?: boolean;
};

type SnackbarContextType = {
  showSnackbar: (message: string, options?: SnackbarOptionsType) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {
    // no-op
  },
});

export const useSnackbar = () => useContext(SnackbarContext);
