import Vue, { ref } from "vue";

import WizSnackbarController from "@/components/base/snackbar/snackbar-controller.vue";
import { SnackbarOption } from "@/components/base/snackbar/types";

const options = ref<SnackbarOption[]>([]);
let snackbar: any = null;

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
    snackbar = new Vue({
      ...WizSnackbarController,
      propsData: { options },
    });
    snackbar.$mount();
    document.body.appendChild(snackbar.$el);
  }

  return show;
};
