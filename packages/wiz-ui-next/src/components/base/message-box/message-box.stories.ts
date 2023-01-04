import { StoryFn, Meta } from "@storybook/vue3";

import { WizText } from "@/components";

import { WizIClose } from "../../icons";

import WizMessageBox from "./message-box.vue";

export default {
  title: "Base/MessageBox",
  component: WizMessageBox,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["information", "caution", "warning"],
    },
    expand: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizMessageBox>;

const Template: StoryFn<typeof WizMessageBox> = (args) => ({
  components: { WizMessageBox, WizText },
  setup: () => ({ args }),
  template: `<WizMessageBox v-bind="args"><WizText>{{ args.slot }}</WizText></WizMessageBox>`,
});

export const Information = Template.bind({});
Information.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  variant: "information",
};

export const Caution = Template.bind({});
Caution.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  variant: "caution",
};

export const Warning = Template.bind({});
Warning.args = {
  title: "ヘッダーヘッダーヘッダー",
  slot: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  variant: "warning",
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
