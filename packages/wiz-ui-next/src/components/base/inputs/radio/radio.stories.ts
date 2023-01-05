import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

import { WizRadio } from ".";

export default {
  title: "Base/Input/Radio",
  component: WizRadio,
  argTypes: {
    input: {
      action: "input",
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizRadio>;

const Template: StoryFn<typeof WizRadio> = (args) => ({
  components: { WizRadio },
  setup() {
    const value = ref();
    return { value, args };
  },
  template: `
  <div>
    <p>入力値：{{ value }}</p>
    <WizRadio v-bind="args" v-model="value" @update:modelValue="args.input" />
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

export const AllDisabled = Template.bind({});
AllDisabled.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
  ],
  disabled: true,
};

export const SpotDisabled = Template.bind({});
SpotDisabled.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
  ],
  disabledKey: 0,
};

export const Vertical = Template.bind({});
Vertical.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
  ],
  direction: "vertical",
};
