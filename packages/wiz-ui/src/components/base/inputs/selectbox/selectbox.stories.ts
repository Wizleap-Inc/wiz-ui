import { StoryFn } from "@storybook/vue";

import WizSelectBox from "./selectbox.vue";

export default {
  title: "Base/Input/SelectBox",
  component: WizSelectBox,
  argTypes: {},
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSelectBox },
  template: `<WizSelectBox v-bind="$props" />`,
});

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
