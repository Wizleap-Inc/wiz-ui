import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

import { WizChatForm } from ".";

export default {
  title: "Custom/Chat/Form",
  component: WizChatForm,
  argTypes: {
    placeholder: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    value: {
      control: {
        type: "text",
      },
    },
    input: {
      action: "update:modelValue",
    },
    submit: {
      action: "submit",
    },
  },
} as Meta<typeof WizChatForm>;

const Template: StoryFn<typeof WizChatForm> = (args) => ({
  components: { WizChatForm },
  setup() {
    const value = ref("");
    return { value, args };
  },
  template: `<WizChatForm v-bind="args" v-model="value" @update:modelValue="args.input" @submit="args.submit" />`,
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizChatForm v-model="value" @update:modelValue="args.input" @submit="args.submit" />
</template>
      `,
    },
  },
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "入力してください",
};
Placeholder.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizChatForm v-model="value" placeholder="入力してください" @update:modelValue="args.input" @submit="args.submit" />
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
    source: {
      code: `
<template>
  <WizChatForm v-model="value" disabled @update:modelValue="args.input" @submit="args.submit" />
</template>
      `,
    },
  },
};
