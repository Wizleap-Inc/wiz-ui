import { Meta, StoryFn } from "@storybook/vue3";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import { WizTextInput } from "@/components";

import { WizFormGroup, WizFormControl } from ".";

export default {
  title: "Custom/Form/Group",
  component: WizFormGroup,
  subcomponents: { WizFormControl },
  argTypes: {
    labelWidth: {
      control: { type: "text" },
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
  },
} as Meta<typeof WizFormGroup>;

const Template: StoryFn<typeof WizFormGroup> = (args) => ({
  setup() {
    const input1 = ref("");
    const input2 = ref("");
    return { args, input1, input2 };
  },
  components: { WizFormGroup, WizFormControl, WizTextInput },
  template: `
    <WizFormGroup v-bind="args">
      <WizFormControl label="Label1">
        <WizTextInput v-model="input1" name="input1" />
      </WizFormControl>
      <WizFormControl label="Label2" required>
        <WizTextInput v-model="input2" name="input2" />
      </WizFormControl>
    </WizFormGroup>
  `,
});

interface Props {
  labelWidth: string;
  gap: string;
}

const CODE_TEMPLATE = ({ labelWidth, gap }: Partial<Props>) => `
<template>
  <WizFormGroup${
    (labelWidth ? ` label-width="${labelWidth}"` : "") +
    (gap ? ` gap="${gap}"` : "")
  }>
    <WizFormControl label="Label1">
      <WizTextInput v-model="input" name="input" />
    </WizFormControl>
    <WizFormControl label="Label2" required>
      <WizTextInput v-model="input" name="input" />
    </WizFormControl>
    ...
  </WizFormGroup$>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { WizFormGroup, WizFormControl, WizTextInput } from "@/components";

const input = ref("");
</script>
`;

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      component: `
### WizFormGroup
各FormControlをまとめて表示するためのコンポーネントです。複数のFormControlをslotに持たせて使用します。
    `,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const LabelWidth = Template.bind({});
LabelWidth.args = {
  labelWidth: "6rem",
};
LabelWidth.parameters = {
  docs: {
    description: {
      story:
        "slotに持っている**FormControl**のラベルの幅を一度に指定できます。",
    },
    source: {
      code: CODE_TEMPLATE({ labelWidth: "100px" }),
    },
  },
};

export const Gap = Template.bind({});
Gap.args = {
  gap: "md",
};
Gap.parameters = {
  docs: {
    description: {
      story:
        "slotに持っている**FormControl**の各要素間のスペースを一度に指定できます。",
    },
    source: {
      code: CODE_TEMPLATE({ gap: "md" }),
    },
  },
};
