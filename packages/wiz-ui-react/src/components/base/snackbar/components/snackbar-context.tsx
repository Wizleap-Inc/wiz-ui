import { createContext, useContext } from "react";

type SnackbarContextType = {
  showSnackbar: (message: string) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {
    // no-op
  },
});

export const useSnackbar = () => useContext(SnackbarContext);
