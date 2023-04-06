import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface FormControl {
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

const FormControlContext = createContext<FormControl | undefined>(undefined);

export const useFormControlProvider = (): FormControl => {
  const [isError, setIsError] = useState(false);
  return {
    isError,
    setIsError,
  };
};

interface FormControlProviderProps {
  children: ReactNode;
}

export const FormControlProvider = ({ children }: FormControlProviderProps) => {
  const formControl = useFormControlProvider();
  return (
    <FormControlContext.Provider value={formControl}>
      {children}
    </FormControlContext.Provider>
  );
};

export const useFormControl = (): FormControl => {
  let formControl = useContext(FormControlContext);
  if (!formControl) {
    formControl = {
      isError: false,
      // formControlがundefinedなため
      // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
      setIsError: () => {},
    };
  }
  return formControl;
};
