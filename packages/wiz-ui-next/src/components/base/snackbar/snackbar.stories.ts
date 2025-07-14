/* eslint-disable react-hooks/rules-of-hooks */
import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

import { WizSnackbar, WizProvider } from "@/components";
import { useSnackbar } from "@/hooks";

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
    expand: {
      control: {
        type: "boolean",
      },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof WizSnackbar>;

const Template: StoryFn<typeof WizSnackbar> = (args) => ({
  components: { WizSnackbar },
  setup() {
    return { args };
  },
  template: `<WizSnackbar v-bind="$props"/>`,
});

export const Default = Template.bind({});
Default.args = {
  message: "Hello World Hello World Hello World Hello World",
  isStatic: true,
};

export const Expand = Template.bind({});
Expand.args = {
  message: "Hello World Hello World Hello World Hello World",
  isStatic: true,
  expand: true,
};

export const UseSnackbar: StoryFn<typeof WizSnackbar> = () => ({
  setup() {
    const message = ref("Hello World");
    const { snack } = useSnackbar();
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

export const UseSnackbarWithExpand: StoryFn<typeof WizSnackbar> = () => ({
  setup() {
    const message = ref("Hello World");
    const options = ref({ expand: true });
    const { snack } = useSnackbar();
    return {
      message,
      options,
      snack,
    };
  },
  template: `
    <div style="text-align: center;">
      <input v-model="message" />
      <button @click="snack(message, options)">Show</button>
    </div>
  `,
});
