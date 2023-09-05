import { Meta, StoryFn } from "@storybook/vue3";

import TabPane from "./tab-pane.vue";

export default {
  title: "Base/Tab/Pane",
  component: TabPane,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    active: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    notificationCount: {
      control: { type: "number" },
    },
    width: {
      control: { type: "text" },
    },
    click: {
      action: "click",
    },
  },
} as Meta<typeof TabPane>;

const Template: StoryFn<typeof TabPane> = (args) => ({
  components: { TabPane },
  setup: () => ({ args }),
  template: `
    <TabPane v-bind="args" @click="click" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: "ほげほげ",
};

export const Active = Template.bind({});
Active.args = {
  label: "ほげほげ",
  active: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "ほげほげ",
  disabled: true,
};

export const NotificationCount = Template.bind({});
NotificationCount.args = {
  label: "ほげほげ",
  notificationCount: 10,
};

export const BadgeColor = Template.bind({});
BadgeColor.args = {
  label: "ほげほげ",
  notificationCount: 10,
  badgeColor: "green",
};

export const Width = Template.bind({});
Width.args = {
  label: "ほげほげ",
  width: "100px",
};
