import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import WizTimePicker from "./time-picker.vue";

export default {
  title: "Base/Input/TimePicker",
  component: WizTimePicker,
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
  components: { WizTimePicker },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `<WizTimePicker v-bind="$props"  v-model="value" @input="input"/>`,
});

// デフォルト
export const Default = Template.bind({});
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizTimePicker v-model="value" @input="input"/>
</template>
      `,
    },
  },
};

// 入力禁止
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: "`disabled` に指定することもできます。",
    },
    source: {
      code: `
<template>
  <WizTimePicker disabled v-model="value" @input="input"/>
</template>
      `,
    },
  },
};
