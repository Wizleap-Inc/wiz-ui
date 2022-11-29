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
  },
};

const baseProps = {
  notifications: [
    {
      title:
        "ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ",
      timestamp: new Date("2021-01-01 00:00:00"),
      read: false,
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
    },
    {
      title:
        "ふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふがふが",
      timestamp: new Date("2021-01-01 00:00:00"),
      read: true,
      tableInfo: [
        {
          title: "情報3",
          content: "データ3",
        },
        {
          title: "情報4",
          content: "データ4",
        },
      ],
    },
    {
      title:
        "ぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよぴよ",
      timestamp: new Date("2021-01-01 00:00:00"),
      read: true,
      tableInfo: [
        {
          title: "情報5",
          content: "データ5",
        },
        {
          title: "情報6",
          content: "データ6",
        },
      ],
    },
  ],
};

const MultiVariantTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNotificationList, WizHStack },
  template: `
  <div style="width: 616px">
    <WizHStack gap="md">
      <WizNotificationList v-bind="$props" />
      <WizNotificationList v-bind="$props" variant="secondary" />
    </WizHStack>
  </div>
  `,
});

export const Variant = MultiVariantTemplate.bind({});
Variant.args = {
  ...baseProps,
};
