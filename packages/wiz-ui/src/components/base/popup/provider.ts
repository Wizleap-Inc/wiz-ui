import { Ref, InjectionKey, reactive, ref, readonly } from "vue";

interface PxInfo {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export const usePopupProvider = (
  containerRef: Ref<HTMLElement | undefined>
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
  const isPopupOpen = ref(false);

  const updateBodyPxInfo = () => {
    if (containerRef.value) {
      const { top, left, right, bottom, width, height } =
        containerRef.value.getBoundingClientRect();
      Object.assign(bodyPxInfo, {
        top: top + window.scrollY,
        left: left + window.scrollX,
        right,
        bottom,
        width,
        height,
      });
    }
  };

  const setPopupOpen = (isOpen: boolean) => {
    isPopupOpen.value = isOpen;
  };

  return {
    initialPxInfo,
    bodyPxInfo: readonly(bodyPxInfo),
    updateBodyPxInfo,
    isPopupOpen: readonly(isPopupOpen),
    setPopupOpen,
  };
};

export const POPUP_KEY: InjectionKey<ReturnType<typeof usePopupProvider>> =
  Symbol("popup");
