import { StoryFn } from "@storybook/vue";

import { WizNotification } from ".";

export default {
  title: "Custom/Notification",
  component: WizNotification,
  argTypes: {
    items: {
      control: { type: "object" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNotification },
  template: `
    <WizNotification v-bind="$props" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  tabs: [
    {
      label: "タブ1",
      name: "tab1",
      notificationCount: 3,
      variant: "primary",
    },
    {
      label: "タブ2",
      name: "tab2",
      notificationCount: 0,
      variant: "secondary",
    },
  ],
  notifications: Array.from({ length: 10 }, (_, i) => ({
    title: "ほげほげほげほげほげほげほげほげほげほげほげほげほげほげ",
    timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365),
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
