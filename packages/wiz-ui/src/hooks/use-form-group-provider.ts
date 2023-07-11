import { ColorKeys, FontSizeKeys } from "@wizleap-inc/wiz-ui-constants";
import { ref, readonly, InjectionKey } from "vue";

export const useFormGroupProvider = () => {
  const labelWidth = ref("");
  const setLabelWidth = (value: string) => {
    labelWidth.value = value;
  };

  const labelColor = ref<ColorKeys>("gray.900");
  const setLabelColor = (value: ColorKeys) => {
    labelColor.value = value;
  };

  const labelFontSize = ref<FontSizeKeys>("md");
  const setLabelFontSize = (value: FontSizeKeys) => {
    labelFontSize.value = value;
  };

  return {
    labelWidth: readonly(labelWidth),
    setLabelWidth,
    labelColor: readonly(labelColor),
    setLabelColor,
    labelFontSize: readonly(labelFontSize),
    setLabelFontSize,
  };
};

export const formGroupKey: InjectionKey<
  ReturnType<typeof useFormGroupProvider>
> = Symbol("FormGroup");
