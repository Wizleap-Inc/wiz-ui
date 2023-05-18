import { ref, readonly } from "vue";

import { SnackbarOption } from "@/components/base/snackbar/types";

import { globalInject, globalKey } from "./use-global-provider";

export const useSnackbarManager = () => {
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

export const useSnackbar = () => {
  const { snack, snackbarOptions } = globalInject(globalKey);
  return {
    snack,
    snackbarOptions,
  };
};
