import { StoryFn } from "@storybook/vue";

import { WizText, WizVStack, WizHStack, WizBox } from "@/components";

import { WizNotificationPanel } from ".";

export default {
  title: "Custom/Notification/Panel",
  component: WizNotificationPanel,
  argTypes: {
    title: {
      control: { type: "text" },
    },
    timestamp: {
      control: { type: "date" },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    tableInfo: {
      control: { type: "array" },
    },
    read: {
      control: { type: "boolean" },
    },
    click: {
      action: "click",
    },
  },
};

const baseProps = {
  title:
    "ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ",
  timestamp: new Date("2021-01-01 00:00:00"),
  variant: "primary",
  tableInfo: [
    {
      title: "情報1",
      content: "データ1",
    },
    {
      title: "情報2",
      content: "データ2",
    },
  ],
  read: false,
};

const MultiVariantTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNotificationPanel, WizVStack, WizHStack, WizText, WizBox },
  template: `
  <div style="width: 616px">
    <WizHStack gap="md">
      <WizVStack gap="md">
        <WizText>variant = primary(default)</WizText>
        <WizNotificationPanel v-bind="$props" @click="click"/>
      </WizVStack>
      <WizVStack gap="md">
        <WizText>variant = secondary</WizText>
        <WizNotificationPanel v-bind="$props" variant="secondary" @click="click"/>
      </WizVStack>
    </WizHStack>
  </div>
  `,
});

export const Unread = MultiVariantTemplate.bind({});
Unread.args = {
  ...baseProps,
};

export const Read = MultiVariantTemplate.bind({});
Read.args = {
  ...baseProps,
  read: true,
};
