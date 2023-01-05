import { ref, readonly, InjectionKey } from "vue";

export const useFormGroupProvider = () => {
  const labelWidth = ref("");
  const setLabelWidth = (value: string) => {
    labelWidth.value = value;
  };

  return {
    labelWidth: readonly(labelWidth),
    setLabelWidth,
  };
};

export const formGroupKey: InjectionKey<
  ReturnType<typeof useFormGroupProvider>
> = Symbol("FormGroup");
