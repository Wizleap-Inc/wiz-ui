import { ref, readonly } from "vue";

export const useDisplayProvider = () => {
  const isMenuOpen = ref(true);
  const setIsMenuOpen = (value: boolean) => {
    isMenuOpen.value = value;
  };

  return {
    isMenuOpen: readonly(isMenuOpen),
    setIsMenuOpen,
  };
};
