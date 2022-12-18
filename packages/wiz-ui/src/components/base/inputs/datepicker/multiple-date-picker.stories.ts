import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizHStack } from "@/components";

import WizMultipleDatepicker from "./multiple-date-picker.vue";

export default {
  title: "Base/Input/MultipleDatepicker",
  component: WizMultipleDatepicker,
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
  components: { WizMultipleDatepicker, WizHStack },
  setup() {
    const defaultValue = new Date().setHours(0, 0, 0, 0);
    const value = ref(new Date(defaultValue));
    return { value };
  },
  template: `
    <WizHStack>
      <WizMultipleDatepicker v-bind="$props"  v-model="value" @input="input"/>
    </WizHStack>
  `,
});

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
