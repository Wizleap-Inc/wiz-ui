import { ref, readonly } from "vue";

export const useMenu = () => {
  const isMenuOpen = ref(true);
  const setIsMenuOpen = (value: boolean) => {
    isMenuOpen.value = value;
  };
  return {
    isMenuOpen: readonly(isMenuOpen),
    setIsMenuOpen,
  };
};
