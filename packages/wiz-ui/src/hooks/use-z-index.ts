import { computed, ref } from "vue";

const zIndex = ref(0);

/**
 * ```ts
 * const {currentZIndex, nextZIndex} = useZIndex(THEME.zIndex.dialog);
 * const dialogButtonZIndex = nextZIndex(); // 2001
 * const confirmZIndex = nextZIndex(); // 2002
 * ```
 */
export const useZIndex = (initialZIndex: number) => {
  zIndex.value = initialZIndex;
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
