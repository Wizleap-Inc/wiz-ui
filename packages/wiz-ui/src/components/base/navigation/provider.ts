import { InjectionKey, ref } from "vue";

export const useProvide = () => {
  const isMenuOpen = ref(true);

  return {
    isMenuOpen,
  };
};

export const key: InjectionKey<ReturnType<typeof useProvide>> =
  Symbol("NavigationProvider");
