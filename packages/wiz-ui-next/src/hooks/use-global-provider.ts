import { InjectionKey, inject } from "vue";

import { useBreakpointProvider } from "./use-breakpoint";
import { useMenu } from "./use-menu";
import { useSnackbarManager } from "./use-snackbar";

export const useGlobalProvider = () => {
  return {
    ...useMenu(),
    ...useSnackbarManager(),
    ...useBreakpointProvider(),
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
