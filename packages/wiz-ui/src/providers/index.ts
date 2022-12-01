import { inject, InjectionKey } from "vue";

import { useDisplayProvider } from "./display";

export const useGlobalProvider = () => {
  const displayProvider = useDisplayProvider();

  return {
    ...displayProvider,
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
