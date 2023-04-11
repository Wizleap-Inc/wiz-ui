import { ref, readonly, InjectionKey, inject } from "vue";

import { SnackbarOption } from "@/components/base/snackbar/types";

const useMenu = () => {
  const isMenuOpen = ref(true);
  const setIsMenuOpen = (value: boolean) => {
    isMenuOpen.value = value;
  };
  return {
    isMenuOpen: readonly(isMenuOpen),
    setIsMenuOpen,
  };
};

const useSnackbar = () => {
  const options = ref<SnackbarOption[]>([]);
  const snack = (message: string) => {
    const created = new Date().toISOString();
    const deleteSnackbar = () => {
      options.value = options.value.filter(
        (options) => options.created !== created
      );
    };
    options.value.push({
      message,
      created,
      delete: deleteSnackbar,
    });
  };
  return {
    snackbarOptions: readonly(options),
    snack,
  };
};

export const useGlobalProvider = () => {
  return {
    ...useMenu(),
    ...useSnackbar(),
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
