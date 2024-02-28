import { Ref, InjectionKey, reactive, readonly } from "vue";

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

  const updateBodyPxInfo = (isPopupFixed: boolean) => {
    if (containerRef.value) {
      const { top, left, right, bottom, width, height } =
        containerRef.value.getBoundingClientRect();
      const visualViewportOffset = {
        top: isPopupFixed ? window.visualViewport?.offsetTop ?? 0 : 0,
        left: isPopupFixed ? window.visualViewport?.offsetLeft ?? 0 : 0,
      };
      Object.assign(bodyPxInfo, {
        top: top + visualViewportOffset.top,
        left: left + visualViewportOffset.left,
        right: right + visualViewportOffset.left,
        bottom: bottom + visualViewportOffset.top,
        width,
        height,
      });
    }
  };

  return {
    initialPxInfo,
    bodyPxInfo: readonly(bodyPxInfo),
    updateBodyPxInfo,
    containerRef,
  };
};

export const POPUP_KEY: InjectionKey<ReturnType<typeof usePopupProvider>> =
  Symbol("popup");
