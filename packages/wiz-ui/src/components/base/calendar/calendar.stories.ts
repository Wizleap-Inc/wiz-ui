import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizHStack } from "@/components";

import WizCalendar from "./calendar.vue";

export default {
  title: "Base/Calendar",
  component: WizCalendar,
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
  components: { WizCalendar, WizHStack },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `<WizCalendar v-bind="$props"  v-model="value" @input="input"/>`,
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
