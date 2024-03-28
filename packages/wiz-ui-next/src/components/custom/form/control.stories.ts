import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

import { WizTextInput } from "@/components";

import { WizFormControl } from ".";
export default {
  title: "Custom/Form/Control",
  component: WizFormControl,
  argTypes: {
    htmlFor: {
      control: { type: "text" },
    },
    label: {
      control: { type: "text" },
    },
    required: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "text" },
    },
    direction: {
      control: { type: "select", options: ["horizontal", "vertical"] },
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
      <WizTextInput v-model="input" name="input" :id="htmlFor" placeholder="入力してください" />
    </WizFormControl>
  `,
});

interface Options {
  label: string;
  required: boolean;
  error: string;
  direction: "horizontal" | "vertical";
}

const CODE_TEMPLATE = ({
  label,
  required,
  error,
  direction,
}: Partial<Options>) => `
<template>
  <WizFormControl${
    (label ? ` label="${label}"` : "") +
    (required ? ` required` : "") +
    (error ? ` error="${error}"` : "") +
    (direction ? ` direction="${direction}"` : "")
  }>
    <WizTextInput v-model="input" name="input" placeholder="入力してください" />
  </WizFormControl>
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
      code: CODE_TEMPLATE({
        label: "Label",
      }),
    },
  },
};

export const Direction = Template.bind({});
Direction.args = {
  label: "Label",
  direction: "vertical",
};
Direction.parameters = {
  docs: {
    description: {
      story:
        "directionには、horizontal, verticalのいずれかを渡すことができます。デフォルトはhorizontalです。",
    },
    source: {
      code: CODE_TEMPLATE({
        label: "Label",
        direction: "vertical",
      }),
    },
  },
};

export const HtmlFor = Template.bind({});
HtmlFor.args = {
  label: "Label",
  htmlFor: "hogehoge",
};
HtmlFor.parameters = {
  docs: {
    description: {
      component: `
### WizFormControl
各Inputコンポーネントをラップするコンポーネントです。そのInputコンポーネントのラベルやエラーメッセージを表示します。
    `,
    },
    source: {
      code: CODE_TEMPLATE({
        label: "Label",
      }),
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
      code: CODE_TEMPLATE({
        label: "Label",
        required: true,
      }),
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
      code: CODE_TEMPLATE({
        label: "Label",
        error: "空白にはできません",
      }),
    },
  },
};
