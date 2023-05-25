import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import WizTimePicker from "./time-picker.vue";

export default {
  title: "Base/Input/TimePicker",
  component: WizTimePicker,
  argTypes: {
    value: {
      control: {
        type: "date",
      },
    },
    input: {
      action: "input",
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTimePicker },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `<WizTimePicker v-bind="$props"  v-model="value">`,
});

// デフォルト
export const Default = Template.bind({});

// 入力禁止
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
