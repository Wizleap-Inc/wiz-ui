import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

import { WizSnackbar, WizProvider } from "@/components";
import { useSnackbar } from "@/hooks/use-snackbar";

export default {
  title: "Base/Snackbar",
  component: { WizSnackbar, WizProvider },
  decorators: [
    () => ({
      components: { WizProvider },
      template: `
      <WizProvider> 
        <story/>
      </WizProvider>`,
    }),
  ],
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
} as Meta<typeof WizSnackbar>;

export const Snackbar: StoryFn<typeof WizSnackbar> = (args) => ({
  components: { WizSnackbar },
  setup() {
    return { args };
  },
  template: `<WizSnackbar :message="args.message" :isStatic="true" />`,
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
