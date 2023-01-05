import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

import { WizTextInput } from "@/components";

import { WizFormControl } from ".";

export default {
  title: "Custom/Form/Control",
  component: WizFormControl,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    required: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "text" },
    },
  },
} as Meta<typeof WizFormControl>;

const Template: StoryFn<typeof WizFormControl> = (args) => ({
  setup() {
    const input = ref("");
    return { args, input };
  },
  components: { WizFormControl, WizTextInput },
  template: `
    <WizFormControl v-bind="args">
      <WizTextInput v-model="input" name="input" placeholder="入力してください" />
    </WizFormControl>
  `,
});

interface Props {
  label: string;
  required: boolean;
  error: string;
}

const CODE_TEMPLATE = ({ label, required, error }: Partial<Props>) => `
<template>
  <WizFormControl${
    (label ? ` label="${label}"` : "") +
    (required ? ` required` : "") +
    (error ? ` error="${error}"` : "")
  }>
    <WizTextInput v-model="input" name="input" placeholder="入力してください" />
  </WizFormControl$>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { WizFormControl, WizTextInput } from "@/components";

const input = ref("");
</script>
`;

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};
Default.parameters = {
  docs: {
    description: {
      component: `
### WizFormControl
各Inputコンポーネントをラップするコンポーネントです。そのInputコンポーネントのラベルやエラーメッセージを表示します。
    `,
    },
    source: {
      code: CODE_TEMPLATE(Default.args),
    },
  },
};

export const Required = Template.bind({});
Required.args = {
  label: "Label",
  required: true,
};
Required.parameters = {
  docs: {
    description: {
      story: "requiredを指定するとlabelの横に**WizTag**で必須と表示されます。",
    },
    source: {
      code: CODE_TEMPLATE(Required.args),
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  label: "Label",
  error: "空白にはできません",
};
Error.parameters = {
  docs: {
    description: {
      story: "errorを指定するとエラーメッセージが表示されます。",
    },
    source: {
      code: CODE_TEMPLATE(Error.args),
    },
  },
};
