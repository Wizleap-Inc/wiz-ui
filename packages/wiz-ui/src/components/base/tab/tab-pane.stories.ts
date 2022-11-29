import { StoryFn } from "@storybook/vue";

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
};

const Template: StoryFn = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TabPane },
  template: `
    <TabPane v-bind="$props" @click="click" />
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

export const Width = Template.bind({});
Width.args = {
  label: "ほげほげ",
  width: "100px",
};
