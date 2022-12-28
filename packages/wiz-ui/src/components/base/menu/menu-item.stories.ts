import { StoryFn } from "@storybook/vue";

import { WizMenuItem } from "./";

export default {
  title: "Base/MenuItem",
  component: WizMenuItem,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    onClick: {
      action: "onClick",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizMenuItem },
  template: `<div><WizMenuItem v-bind="$props" @click="onClick"/></div>`,
});

export const Default = Template.bind({});
Default.args = {
  label: "テスト",
};

export const Active = Template.bind({});
Active.args = {
  label: "テスト",
  active: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "テスト",
  clickable: false,
};
