import Vue, { ref } from "vue";

import WizSnackbarController from "@/components/base/snackbar/snackbar-controller.vue";
import { SnackbarOption } from "@/components/base/snackbar/types";

export const useSnackbar = () => {
  const options = ref<SnackbarOption[]>([]);

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

  const snackbar = new Vue({
    ...WizSnackbarController,
    propsData: { options },
  });
  snackbar.$mount();
  document.body.appendChild(snackbar.$el);

  return show;
};
