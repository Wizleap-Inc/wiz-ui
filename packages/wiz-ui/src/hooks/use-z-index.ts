import { THEME } from "@wiz-ui/constants";
import { computed, ref } from "vue";

const zIndex = ref(0);

/**
 * ```ts
 * const {currentZIndex, nextZIndex} = useZIndex(THEME.zIndex.dialog);
 * const dialogButtonZIndex = nextZIndex(); // 2001
 * const confirmZIndex = nextZIndex(); // 2002
 * ```
 */
export const useZIndex = (initialZIndex: number | string) => {
  zIndex.value = +initialZIndex || +THEME.zIndex.base;
  const currentZIndex = computed(() => zIndex.value);

  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };

  return {
    currentZIndex,
    nextZIndex,
  };
};
