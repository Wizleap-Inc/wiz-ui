import { Meta, StoryFn } from "@storybook/vue3";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import {
  WizTextInput,
  WizPasswordInput,
  WizSelectBox,
  WizCheckBox,
  WizRadio,
  WizTextArea,
  WizDatePicker,
  WizTimePicker,
} from "@/components";
import { CheckBoxOption } from "@/components/base/inputs/checkbox/types";
import { RadioOption } from "@/components/base/inputs/radio/types";
import { SelectBoxOption } from "@/components/base/inputs/selectbox/types";

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

const CHOICES = [
  {
    label: "選択肢1",
    value: 1,
  },
  {
    label: "選択肢2",
    value: 2,
  },
];

export const AllInput: StoryFn<typeof WizFormControl> = () => ({
  components: {
    WizFormGroup,
    WizFormControl,
    WizTextInput,
    WizPasswordInput,
    WizSelectBox,
    WizCheckBox,
    WizRadio,
    WizTextArea,
    WizDatePicker,
    WizTimePicker,
  },
  setup() {
    const textInput = ref("");
    const passwordInput = ref("");
    const textareaInput = ref("");
    const SELECT_OPTIONS: SelectBoxOption[] = CHOICES;
    const selectInput = ref<string | null>(null);
    const CHECKBOX_OPTIONS: CheckBoxOption[] = CHOICES;
    const checkboxInput = ref<number[]>([]);
    const RADIO_OPTIONS: RadioOption[] = CHOICES;
    const radioInput = ref<number | null>(null);
    const datePickerInput = ref(new Date(2021, 0, 1));
    const timePickerInput = ref("");
    return {
      textInput,
      passwordInput,
      textareaInput,
      selectInput,
      SELECT_OPTIONS,
      checkboxInput,
      CHECKBOX_OPTIONS,
      radioInput,
      RADIO_OPTIONS,
      datePickerInput,
      timePickerInput,
    };
  },
  template: `
    <WizFormGroup label-width="10rem" gap="md">
      <WizFormControl label="WizTextInput">
        <WizTextInput v-model="textInput" name="textInput" placeholder="入力してください" />
      </WizFormControl>
      <WizFormControl label="WizPasswordInput">
        <WizPasswordInput v-model="passwordInput" name="passwordInput" placeholder="入力してください" />
      </WizFormControl>
      <WizFormControl label="WizSelectBox">
        <WizSelectBox v-model="selectInput" name="selectInput" placeholder="選択してください" :options="SELECT_OPTIONS" />
      </WizFormControl>
      <WizFormControl label="WizCheckBox">
        <WizCheckBox v-model="checkboxInput" name="checkboxInput" :options="CHECKBOX_OPTIONS" />
      </WizFormControl>
      <WizFormControl label="WizRadio">
        <WizRadio v-model="radioInput" name="radioInput" :options="RADIO_OPTIONS" />
      </WizFormControl>
      <WizFormControl label="WizDatePicker">
        <WizDatePicker v-model="datePickerInput" name="datePickerInput"/>
      </WizFormControl>
      <WizFormControl label="WizTimePicker">
        <WizTimePicker v-model="timePickerInput" name="timePickerInput"/>
      </WizFormControl>
      <WizFormControl label="WizTextArea">
        <WizTextArea v-model="textareaInput" name="textareaInput" placeholder="入力してください" />
      </WizFormControl>
    </WizFormGroup>
  `,
});

export const AllInputError: StoryFn<typeof WizFormControl> = () => ({
  components: {
    WizFormGroup,
    WizFormControl,
    WizTextInput,
    WizPasswordInput,
    WizSelectBox,
    WizCheckBox,
    WizRadio,
    WizTextArea,
    WizDatePicker,
    WizTimePicker,
  },
  setup() {
    const textInput = ref("");
    const passwordInput = ref("");
    const textareaInput = ref("");
    const SELECT_OPTIONS: SelectBoxOption[] = CHOICES;
    const selectInput = ref<string | null>(null);
    const CHECKBOX_OPTIONS: CheckBoxOption[] = CHOICES;
    const checkboxInput = ref<number[]>([]);
    const RADIO_OPTIONS: RadioOption[] = CHOICES;
    const radioInput = ref<number | null>(null);
    const datePickerInput = ref(new Date(2021, 0, 1));
    const timePickerInput = ref("");
    return {
      textInput,
      passwordInput,
      textareaInput,
      selectInput,
      SELECT_OPTIONS,
      checkboxInput,
      CHECKBOX_OPTIONS,
      radioInput,
      RADIO_OPTIONS,
      datePickerInput,
      timePickerInput,
    };
  },
  template: `
    <WizFormGroup label-width="10rem" gap="md">
      <WizFormControl label="WizTextInput" error="エラーが発生しました">
        <WizTextInput v-model="textInput" name="textInput" placeholder="入力してください" />
      </WizFormControl>
      <WizFormControl label="WizPasswordInput" error="エラーが発生しました">
        <WizPasswordInput v-model="passwordInput" name="passwordInput" placeholder="入力してください" />
      </WizFormControl>
      <WizFormControl label="WizSelectBox" error="エラーが発生しました">
        <WizSelectBox v-model="selectInput" name="selectInput" placeholder="選択してください" :options="SELECT_OPTIONS" />
      </WizFormControl>
      <WizFormControl label="WizCheckBox" error="エラーが発生しました">
        <WizCheckBox v-model="checkboxInput" name="checkboxInput" :options="CHECKBOX_OPTIONS" />
      </WizFormControl>
      <WizFormControl label="WizRadio" error="エラーが発生しました">
        <WizRadio v-model="radioInput" name="radioInput" :options="RADIO_OPTIONS" />
      </WizFormControl>
      <WizFormControl label="WizDatePicker" error="エラーが発生しました">
        <WizDatePicker v-model="datePickerInput" name="datePickerInput" />
      </WizFormControl>
      <WizFormControl label="WizTimePicker" error="エラーが発生しました">
        <WizTimePicker v-model="timePickerInput" name="timePickerInput" />
      </WizFormControl>
      <WizFormControl label="WizTextArea" error="エラーが発生しました">
        <WizTextArea v-model="textareaInput" name="textareaInput" placeholder="入力してください" />
      </WizFormControl>
    </WizFormGroup>
  `,
});
