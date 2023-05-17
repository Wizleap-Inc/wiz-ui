import { ref, readonly } from "vue";

import { SnackbarOption } from "@/components/base/snackbar/types";

export const useSnackbar = () => {
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
