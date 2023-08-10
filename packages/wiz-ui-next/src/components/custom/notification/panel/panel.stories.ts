import { StoryFn, Meta } from "@storybook/vue3";

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
} as Meta<typeof WizNotificationPanel>;

const baseProps = {
  title:
    "ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ",
  timestamp: new Date("2021-01-01 00:00:00"),
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

const MultiVariantTemplate: StoryFn<typeof WizNotificationPanel> = (args) => ({
  components: { WizNotificationPanel, WizVStack, WizHStack, WizText, WizBox },
  setup: () => ({ args }),
  template: `
  <div style="width: 616px">
    <WizHStack gap="md">
      <WizVStack gap="md">
        <WizText>variant = primary(default)</WizText>
        <WizNotificationPanel v-bind="args" @click="args.click"/>
      </WizVStack>
      <WizVStack gap="md">
        <WizText>variant = secondary</WizText>
        <WizNotificationPanel v-bind="args" variant="secondary" @click="args.click"/>
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

const WidthTemplate: StoryFn<typeof WizNotificationPanel> = (args) => ({
  components: { WizNotificationPanel, WizVStack, WizHStack, WizText, WizBox },
  setup: () => ({ args }),
  template: `
  <div style="width: 616px">
    <WizHStack gap="md">
      <WizVStack gap="md">
        <WizText>Width</WizText>
        <WizNotificationPanel v-bind="args" @click="args.click"/>
      </WizVStack>
      <WizVStack gap="md">
        <WizText>Width (200px)</WizText>
        <WizNotificationPanel v-bind="args" width="200px" @click="args.click"/>
      </WizVStack>
    </WizHStack>
  </div>
  `,
});
export const Width = WidthTemplate;
Width.args = {
  ...baseProps,
};
