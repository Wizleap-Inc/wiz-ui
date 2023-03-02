import { StoryFn, Meta } from "@storybook/vue3";
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
      defaultValue: "Hello World Hello World Hello World Hello World",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof WizSnackbar>;

export const Snackbar: StoryFn<typeof WizSnackbar> = (args) => ({
  components: { WizSnackbar },
  setup() {
    return { args };
  },
  template: `<WizSnackbar :message="args.message" :visible="true" />`,
});

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
