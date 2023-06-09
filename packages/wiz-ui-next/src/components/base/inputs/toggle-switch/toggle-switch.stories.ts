import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

import { WizToggleSwitch } from ".";

export default {
  title: "Base/Input/ToggleSwitch",
  component: WizToggleSwitch,
  argTypes: {
    switch: {
      action: "update:modelValue",
    },
  },
} as Meta<typeof WizToggleSwitch>;

const Template: StoryFn<typeof WizToggleSwitch> = (args) => ({
  components: { WizToggleSwitch },
  setup() {
    const value = ref(false);
    const value2 = ref(true);
    return { value, value2, args };
  },
  template: `
    <div>
      <p>入力値：{{ value }}</p>
      <WizToggleSwitch v-bind="args" v-model="value" @update:modelValue="args.switch"/>
      <div style="{margin: '40px'}"/>
      <p>入力値：{{ value2 }}</p>
      <WizToggleSwitch v-bind="args" v-model="value2" @update:modelValue="args.switch"/>
    </div>
  `,
});

export const Default = Template.bind({});
