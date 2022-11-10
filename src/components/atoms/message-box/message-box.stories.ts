import { WizIClose } from "../../icons";

import WizMessageBox from "./message-box.vue";

import type { Story } from "@storybook/vue";

export default {
  title: "Atoms/MessageBox",
  component: WizMessageBox,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["Information", "Caution", "Warning"],
      },
    },
  },
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizMessageBox },
  template: `<WizMessageBox v-bind="$props">{{ slot }}</WizMessageBox>`,
});

export const Information = Template.bind({});
Information.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
};

export const Caution = Template.bind({});
Caution.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  type: "Caution",
};

export const Warning = Template.bind({});
Warning.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  type: "Warning",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  icon: WizIClose,
};
