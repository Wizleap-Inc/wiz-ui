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
  template: `
    <WizMessageBox v-bind="args">
      <WizText>
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
      </WizText>
    </WizMessageBox>
  `,
});

export const Information = Template.bind({});
Information.args = {
  title: "ヘッダーヘッダーヘッダー",
  variant: "information",
};

export const Caution = Template.bind({});
Caution.args = {
  title: "ヘッダーヘッダーヘッダー",
  variant: "caution",
};

export const Warning = Template.bind({});
Warning.args = {
  title: "ヘッダーヘッダーヘッダー",
  variant: "warning",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: "ヘッダーヘッダーヘッダー",
  icon: WizIClose,
};

export const Expand = Template.bind({});
Expand.args = {
  title: "ヘッダーヘッダーヘッダー",
  expand: true,
};

export const ExpandWithIcon = Template.bind({});
ExpandWithIcon.args = {
  title: "ヘッダーヘッダーヘッダー",
  expand: true,
  icon: WizIClose,
};

const EmptyTemplate: StoryFn<typeof WizMessageBox> = (args) => ({
  components: { WizMessageBox, WizText },
  setup: () => ({ args }),
  template: `
    <WizMessageBox v-bind="args" />
  `,
});
export const EmptyBody = EmptyTemplate.bind({});
EmptyBody.args = {
  title: "ヘッダーヘッダーヘッダー",
  variant: "information",
};
