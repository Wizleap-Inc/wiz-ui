import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizSnackbar, WizProvider } from "@/components";
import { globalInject, globalKey } from "@/hooks/use-global-provider";

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
    const { snack } = globalInject(globalKey);
    return {
      message,
      snack,
    };
  },
  template: `
    <div style="text-align: center;">
      <input v-model="message" />
      <button @click="snack(message)">Show</button>
    </div>
  `,
});

UseSnackbar.parameters = {
  docs: {
    description: {
      story: `globalInjectでsnack関数を取得し、messageを渡して実行するとSnackbarが表示されます。`,
    },
  },
};
