// import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn } from "@storybook/vue";

import WizSelectBox from "./selectbox.vue";

export default {
  title: "Atoms/SelectBox",
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
