import { ref, readonly, InjectionKey } from "vue";

export const useFormControlProvider = () => {
  const isError = ref(false);
  const setIsError = (value: boolean) => {
    isError.value = value;
  };

  return {
    isError: readonly(isError),
    setIsError,
  };
};

export const formControlKey: InjectionKey<
  ReturnType<typeof useFormControlProvider>
> = Symbol("FormControl");
