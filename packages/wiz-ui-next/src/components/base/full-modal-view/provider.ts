import { InjectionKey, Ref } from "vue";

export const useFullModalViewProvider = (
  anchorRef: Ref<HTMLElement | undefined>
) => {
  return {
    anchorRef,
  };
};

export const FULL_MODAL_VIEW_KEY: InjectionKey<
  ReturnType<typeof useFullModalViewProvider>
> = Symbol("full-modal-view");
