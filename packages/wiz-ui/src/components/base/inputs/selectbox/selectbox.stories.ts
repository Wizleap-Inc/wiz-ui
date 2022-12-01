import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import WizSelectBox from "./selectbox.vue";

export default {
  title: "Base/Input/SelectBox",
  component: WizSelectBox,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    input: {
      action: "input",
    },
  },
};
const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSelectBox },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `<WizSelectBox v-bind="$props"  v-model="value" @input="input"/>`,
});

export const Default = Template.bind({});
Default.args = {
  options: [
    { label: "test1", value: "1" },
    { label: "test2", value: "2" },
    { label: "test3", value: "3" },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
