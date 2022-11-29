import { StoryFn } from "@storybook/vue";

import { WizTabPane } from ".";

export default {
  title: "Base/Tab/Pane",
  component: WizTabPane,
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
  },
};

const Template: StoryFn = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTabPane },
  template: `
    <WizTabPane v-bind="$props" />
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
