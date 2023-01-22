import { StoryFn, Meta } from "@storybook/vue3";
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
} as Meta<typeof WizDatepicker>;

const Template: StoryFn<typeof WizDatepicker> = (args) => ({
  components: { WizDatepicker, WizHStack },
  setup() {
    const defaultValue = new Date("2021-01-01T00:00:00.000Z");
    const value = ref(new Date(defaultValue));
    return { value, args };
  },
  template: `
    <WizHStack>
      <WizDatepicker v-bind="args" v-model="value" @input="args.input"/>
    </WizHStack>
  `,
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
    <WizHStack>
      <WizDatepicker v-bind="$props"  v-model="value" @input="input"/>
    </WizHStack>
</template>
      `,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: "`disabled` に指定することができます。",
    },
    source: {
      code: `
<template>
  <WizHStack>
    <WizDatepicker disabled v-model="value" @input="input"/>
  </WizHStack>
</template>
      `,
    },
  },
};
