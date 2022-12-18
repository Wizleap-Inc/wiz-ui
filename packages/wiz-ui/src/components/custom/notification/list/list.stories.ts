import { StoryFn } from "@storybook/vue";

import { WizHStack } from "@/components";

import { WizNotificationList } from ".";

export default {
  title: "Custom/Notification/List",
  component: WizNotificationList,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    notifications: {
      control: { type: "array" },
    },
    height: {
      control: { type: "string" },
    },
    click: {
      action: "click",
    },
  },
};

const baseProps = {
  notifications: Array.from({ length: 3 }, (_, i) => ({
    id: i,
    title: "ほげほげほげほげほげほげほげほげほげほげほげほげほげほげ",
    timestamp:
      new Date("2021-01-01T00:00:00.000Z").getTime() + i * 1000 * 60 * 60 * 24,
    tabName: ["tab1", "tab2"][i % 2],
    read: i % 3 === 0,
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
  })),
};

const MultiVariantTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNotificationList, WizHStack },
  template: `
  <div style="width: 616px">
    <WizHStack gap="md">
      <WizNotificationList v-bind="$props" @click="click"/>
      <WizNotificationList v-bind="$props" variant="secondary" @click="click"/>
    </WizHStack>
  </div>
  `,
});

export const Variant = MultiVariantTemplate.bind({});
Variant.args = {
  ...baseProps,
};
