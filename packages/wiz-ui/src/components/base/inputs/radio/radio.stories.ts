import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizRadio } from ".";

export default {
  title: "Base/Input/Radio",
  component: WizRadio,
  argTypes: {
    input: {
      action: "input",
    },
  },
};
const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizRadio },
  setup() {
    const value = ref();
    return { value };
  },
  template: `
  <div>
    <p>入力値：{{ value }}</p>
    <WizRadio v-bind="$props" v-model="value" @input="input"/>
  </div>
`,
});

export const Default = Template.bind({});
Default.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
