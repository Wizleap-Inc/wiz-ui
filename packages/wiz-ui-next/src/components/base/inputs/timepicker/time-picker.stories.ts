import { StoryFn, Meta } from "@storybook/vue3";
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
} as Meta<typeof WizTimePicker>;

const Template: StoryFn<typeof WizTimePicker> = (args) => ({
  components: { WizTimePicker },
  setup() {
    const value = ref("");
    return { value, args };
  },
  template: `<WizTimePicker v-bind="args"  v-model="value" @update:modelValue="args.input"/>`,
});

// デフォルト
export const Default = Template.bind({});

// 入力禁止
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
