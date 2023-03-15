import { h, render, ref, VNode } from "vue";

import WizSnackbarController from "@/components/base/snackbar/snackbar-controller.vue";
import { SnackbarOption } from "@/components/base/snackbar/types";

const options = ref<SnackbarOption[]>([]);
let snackbar: VNode | null = null;

export const useSnackbar = () => {
  const show = (message: string) => {
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

  if (!snackbar) {
    snackbar = h(WizSnackbarController, { options });
    render(snackbar, document.body);
  }

  return show;
};
