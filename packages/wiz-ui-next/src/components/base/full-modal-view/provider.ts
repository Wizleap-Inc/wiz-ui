import { InjectionKey, Ref, reactive, readonly } from "vue";

interface PxInfo {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export const useFullModalViewProvider = (
  anchorRef: Ref<HTMLElement | undefined>
) => {
  const initialPxInfo = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  };
  const bodyPxInfo = reactive<PxInfo>(initialPxInfo);

  const updateBodyPxInfo = () => {
    if (anchorRef.value) {
      const { top, left, right, bottom, width, height } =
        anchorRef.value.getBoundingClientRect();
      Object.assign(bodyPxInfo, {
        top,
        left,
        right,
        bottom,
        width,
        height,
      });
    }
  };

  return {
    initialPxInfo,
    bodyPxInfo: readonly(bodyPxInfo),
    updateBodyPxInfo,
    anchorRef,
  };
};

export const FULL_MODAL_VIEW_KEY: InjectionKey<
  ReturnType<typeof useFullModalViewProvider>
> = Symbol("full-modal-view");
