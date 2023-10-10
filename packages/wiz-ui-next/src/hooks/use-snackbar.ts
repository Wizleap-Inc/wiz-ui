import { ref, readonly } from "vue";

import {
  SnackbarOption,
  SnackbarOptionType,
} from "@/components/base/snackbar/types";

import { globalInject, globalKey } from "./use-global-provider";

export const useSnackbarManager = () => {
  const snackOptions = ref<SnackbarOption[]>([]);
  const snack = (message: string, options?: SnackbarOptionType) => {
    const created = new Date().toISOString();
    const deleteSnackbar = () => {
      snackOptions.value = snackOptions.value.filter(
        (options) => options.created !== created
      );
    };
    snackOptions.value.push({
      message,
      options,
      created,
      delete: deleteSnackbar,
    });
  };
  return {
    snackbarOptions: readonly(snackOptions),
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
