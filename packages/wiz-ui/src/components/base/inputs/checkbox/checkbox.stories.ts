import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizCheckBox } from ".";

export default {
  title: "Base/Input/CheckBox",
  component: WizCheckBox,
  argTypes: {
    input: {
      action: "input",
    },
  },
};
const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCheckBox },
  setup() {
    const value = ref([]);
    return { value };
  },
  template: `
  <div>
    <p>入力値：{{ value }}</p>
    <WizCheckBox v-bind="$props" v-model="value" @input="input"/>
  </div>
`,
});

export const Default = Template.bind({});
Default.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
};

export const AllDisabled = Template.bind({});
AllDisabled.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
  disabled: true,
};

export const SpotDisabled = Template.bind({});
SpotDisabled.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
  disabledKey: 1,
};

export const Vertical = Template.bind({});
Vertical.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
  direction: "vertical",
};
