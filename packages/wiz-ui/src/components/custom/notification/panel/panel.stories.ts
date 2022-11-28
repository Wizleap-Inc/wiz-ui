import { StoryFn } from "@storybook/vue";

import { WizText, WizVStack, WizHStack, WizBox } from "@/components";

import { WizNotificationPanel } from ".";

export default {
  title: "Custom/Notification/Card",
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
    status: {
      control: { type: "select" },
      options: ["new", "read", "old"],
    },
    tableInfo: {
      control: { type: "array" },
    },
    bold: {
      control: { type: "boolean" },
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
};

const MultiVariantTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNotificationPanel, WizVStack, WizHStack, WizText, WizBox },
  template: `
  <div style="width: 616px">
    <WizHStack gap="md">
      <WizVStack gap="md">
        <WizText>primary</WizText>
        <WizNotificationPanel v-bind="$props" />
      </WizVStack>
      <WizVStack gap="md">
        <WizText>secondary</WizText>
        <WizNotificationPanel v-bind="$props" variant="secondary" />
      </WizVStack>
    </WizHStack>
  </div>
  `,
});

export const Variant = MultiVariantTemplate.bind({});
Variant.args = {
  ...baseProps,
};

export const StatusNew = MultiVariantTemplate.bind({});
StatusNew.args = {
  ...baseProps,
  status: "new",
};

export const StatusRead = MultiVariantTemplate.bind({});
StatusRead.args = {
  ...baseProps,
  status: "read",
};

export const StatusOld = MultiVariantTemplate.bind({});
StatusOld.args = {
  ...baseProps,
  status: "old",
};
