import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizSnackbar } from "@/components";
import { useSnackbar } from "@/hooks/use-snackbar";

export default {
  title: "Base/Snackbar",
  component: WizSnackbar,
  argTypes: {
    message: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const Snackbar: StoryFn<typeof WizSnackbar> = (_, { argTypes }) => ({
  components: { WizSnackbar },
  props: Object.keys(argTypes),
  template: `<WizSnackbar :message="$props.message" :isStatic="true" />`,
});

Snackbar.args = {
  message: "Hello World Hello World Hello World Hello World",
};

export const UseSnackbar: StoryFn<typeof WizSnackbar> = () => ({
  setup() {
    const message = ref("Hello World");
    const show = useSnackbar();
    return {
      message,
      show,
    };
  },
  template: `
    <div style="text-align: center;">
      <input v-model="message" />
      <button @click="show(message)">Show</button>
    </div>
  `,
});

UseSnackbar.parameters = {
  docs: {
    description: {
      story: `useSnackbarからshow関数を取得し、messageを渡して実行するとSnackbarが表示されます。`,
    },
  },
};
