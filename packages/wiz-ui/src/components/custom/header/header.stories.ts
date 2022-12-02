import { StoryFn } from "@storybook/vue";
import { provide } from "vue";

import { useGlobalProvider, globalKey } from "@/providers";

import { WizCustomHeader } from ".";

export default {
  title: "Custom/Header",
  component: WizCustomHeader,
  decorators: [
    (story: StoryFn) => ({
      components: { story },
      setup() {
        provide(globalKey, useGlobalProvider());
      },
      template: `<story />`,
    }),
  ],
};

const DefaultTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCustomHeader },
  template: `
    <wiz-custom-header
      title="Wiz UI"
      avatarSrc="./public/images/avatar-1.png"
      v-bind="$props"
    />
  `,
});

export const Default = DefaultTemplate.bind({});
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
  notifications: Array.from({ length: 14 }, (_, i) => ({
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
