import { StoryFn } from "@storybook/vue";

import { WizIClose } from "../../icons";

import WizMessageBox from "./message-box.vue";

export default {
  title: "Atoms/MessageBox",
  component: WizMessageBox,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["information", "caution", "warning"],
    },
    expand: {
      control: { type: "boolean" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizMessageBox },
  template: `<WizMessageBox v-bind="$props">{{ slot }}</WizMessageBox>`,
});

export const Information = Template.bind({});
Information.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  type: "information",
};

export const Caution = Template.bind({});
Caution.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  type: "caution",
};

export const Warning = Template.bind({});
Warning.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  type: "warning",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  icon: WizIClose,
};

export const Expand = Template.bind({});
Expand.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  expand: true,
};
