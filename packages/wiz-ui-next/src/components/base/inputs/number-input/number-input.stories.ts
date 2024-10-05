import { Meta, StoryFn } from "@storybook/vue3";

import { WizHStack } from "@/components";

import { WizNumberInput } from ".";

export default {
  title: "Base/Input/NumberInput",
  component: WizNumberInput,
} as Meta<typeof WizNumberInput>;

const Template: StoryFn<typeof WizNumberInput> = (args) => ({
  components: { WizNumberInput, WizHStack },
  setup() {
    return { args };
  },
  template: `
    <div>
      <WizNumberInput v-bind="args" v-model="args.modelValue"/>
      <div> value : {{ args.modelValue }} </div>
    </div>
  `,
});
export const Default = Template.bind({});
Default.args = {};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "数字を入力",
};

export const WithValue = Template.bind({});
WithValue.args = {
  modelValue: 100,
};

export const Disabled = Template.bind({});
Disabled.args = {
  modelValue: 100,
  disabled: true,
};
