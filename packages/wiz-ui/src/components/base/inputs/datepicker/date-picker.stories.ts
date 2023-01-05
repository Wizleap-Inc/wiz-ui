import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizHStack } from "@/components";

import WizDatepicker from "./date-picker.vue";

export default {
  title: "Base/Input/Datepicker",
  component: WizDatepicker,
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
  components: { WizDatepicker, WizHStack },
  setup() {
    const defaultValue = new Date("2021-01-01T00:00:00.000Z");
    const value = ref(new Date(defaultValue));
    return { value };
  },
  template: `
    <WizHStack>
      <WizDatepicker v-bind="$props"  v-model="value" @input="input"/>
    </WizHStack>
  `,
});

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
