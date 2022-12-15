import { ref, readonly, InjectionKey, inject } from "vue";

export const useGlobalProvider = () => {
  const isMenuOpen = ref(true);
  const setIsMenuOpen = (value: boolean) => {
    isMenuOpen.value = value;
  };

  return {
    isMenuOpen: readonly(isMenuOpen),
    setIsMenuOpen,
  };
};

export const globalKey: InjectionKey<ReturnType<typeof useGlobalProvider>> =
  Symbol("Global");

export const globalInject = <T>(key: InjectionKey<T>): T => {
  const value = inject(key);
  if (!value) {
    throw new Error(
      `Global Providerは必ずApp.vue等のvueエントリーポイントファイルでprovideされている必要があります。`
    );
  }
  return value;
};
