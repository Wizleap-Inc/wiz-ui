import { computed, ref } from "vue";

import { getZIndexCSS } from "@/utils/styles/z-index";

const zIndex = ref(0);
const INITIAL_Z_INDEX = getZIndexCSS("popup");

export const useZIndex = () => {
  const currentZIndex = computed(() => INITIAL_Z_INDEX + zIndex.value);

  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };

  return {
    currentZIndex,
    nextZIndex,
  };
};
