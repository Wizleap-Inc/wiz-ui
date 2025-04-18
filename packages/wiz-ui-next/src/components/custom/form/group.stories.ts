import { Meta, StoryFn } from "@storybook/vue3";
import {
  COLOR_MAP_ACCESSORS,
  ColorKeys,
  FONT_SIZE_ACCESSORS,
  FontSizeKeys,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import {
  WizCheckBox,
  WizDatePicker,
  WizDateRangePicker,
  WizPasswordInput,
  WizRadio,
  WizSelectBox,
  WizTextArea,
  WizTextInput,
  WizTimePicker,
} from "@/components";
import { CheckBoxOption } from "@/components/base/inputs/checkbox/types";
import {
  DateRange,
  DateRangePickerSelectBoxOption,
} from "@/components/base/inputs/date-range-picker/types";
import { WizNumberInput } from "@/components/base/inputs/number-input";
import { RadioOption } from "@/components/base/inputs/radio/types";
import { SelectBoxOption } from "@/components/base/inputs/selectbox/types";

import { WizFormControl, WizFormGroup } from ".";

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
    labelColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    labelFontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    labelTagPosition: {
      control: { type: "select" },
      options: ["left", "right"],
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

interface Options {
  labelWidth: string;
  gap: string;
  labelColor: ColorKeys;
  labelFontSize: FontSizeKeys;
  labelTagPosition: "right" | "left";
}

const CODE_TEMPLATE = ({
  labelWidth,
  gap,
  labelColor,
  labelFontSize,
  labelTagPosition,
}: Partial<Options>) => `
<template>
  <WizFormGroup${
    (labelWidth ? ` label-width="${labelWidth}"` : "") +
    (gap ? ` gap="${gap}"` : "") +
    (labelColor ? ` label-color="${labelColor}"` : "") +
    (labelFontSize ? ` label-font-size="${labelFontSize}"` : "") +
    (labelTagPosition ? ` label-tag-position="${labelTagPosition}"` : "")
  }>
    <WizFormControl label="Label1">
      <WizTextInput v-model="input" name="input" />
    </WizFormControl>
    <WizFormControl label="Label2" required>
      <WizTextInput v-model="input" name="input" />
    </WizFormControl>
    ...
  </WizFormGroup>
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
  labelWidth: "6.25rem",
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

export const LabelColor = Template.bind({});
LabelColor.args = {
  labelColor: "red.500",
};
LabelColor.parameters = {
  docs: {
    description: {
      story:
        "slotに持っている**FormControl**の各要素のラベル色を一括指定できます。",
    },
    source: {
      code: CODE_TEMPLATE({ labelColor: "red.500" }),
    },
  },
};

export const LabelFontSize = Template.bind({});
LabelFontSize.args = {
  labelFontSize: "xl3",
};
LabelFontSize.parameters = {
  docs: {
    description: {
      story:
        "slotに持っている**FormControl**の各要素のラベルサイズを一括指定できます。",
    },
    source: {
      code: CODE_TEMPLATE({ labelFontSize: "xl3" }),
    },
  },
};

export const LabelTagPosition = Template.bind({});
LabelTagPosition.args = {
  labelTagPosition: "left",
};
LabelTagPosition.parameters = {
  docs: {
    description: {
      story:
        "slotに持っている**FormControl**の各要素のラベルタグの位置を一括指定できます。ただし、各**FormControl**に個別でlabelTagPositionが指定されている場合は、そちらがの設定が優先されます。",
    },
    source: {
      code: CODE_TEMPLATE({ labelTagPosition: "left" }),
    },
  },
};

const SELECT_BOX_CHOICES: SelectBoxOption[] = [
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
    WizDateRangePicker,
    WizNumberInput,
  },
  setup() {
    const textInput = ref("");
    const passwordInput = ref("");
    const textareaInput = ref("");
    const SELECT_OPTIONS: SelectBoxOption[] = SELECT_BOX_CHOICES;
    const selectInput = ref<string | null>(null);
    const checkBoxOptions: CheckBoxOption[] = [
      {
        label: "選択肢1",
        value: 1,
        key: "checkBoxChoice1",
      },
      {
        label: "選択肢2",
        value: 2,
        key: "checkBoxChoice2",
      },
    ];
    const checkboxInput = ref<number[]>([]);
    const radioOptions: RadioOption[] = [
      {
        label: "選択肢1",
        value: 1,
        key: "radioChoice1",
      },
      {
        label: "選択肢2",
        value: 2,
        key: "radioChoice2",
      },
    ];
    const radioInput = ref<number | null>(null);
    const datePickerInput = ref(new Date(2021, 0, 1));
    const timePickerInput = ref("");
    const dateRangeInput = ref<DateRange>({
      start: null,
      end: null,
    });
    const selectBoxOptions = ref<DateRangePickerSelectBoxOption[]>([
      { label: "選択肢1", value: "1" },
      { label: "選択肢2", value: "2" },
      { label: "選択肢3", value: "3" },
    ]);
    const selectBoxInput = ref("");
    const numberInput = ref<number>();
    return {
      textInput,
      passwordInput,
      textareaInput,
      selectInput,
      SELECT_OPTIONS,
      checkboxInput,
      checkBoxOptions,
      radioInput,
      radioOptions,
      datePickerInput,
      timePickerInput,
      dateRangeInput,
      selectBoxOptions,
      selectBoxInput,
      numberInput,
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
        <WizCheckBox v-model="checkboxInput" name="checkboxInput" :options="checkBoxOptions" />
      </WizFormControl>
      <WizFormControl label="WizRadio">
        <WizRadio v-model="radioInput" name="radioInput" :options="radioOptions" />
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
      <WizFormControl label="WizDateRangePicker">
        <WizDateRangePicker v-model="dateRangeInput" name="dateRangeInput" :selectBoxOptions="selectBoxOptions" v-model:selectBoxValue="selectBoxInput" />
      </WizFormControl>
      <WizFormControl label="WizNumberInput">
        <WizNumberInput v-model="numberInput" name="numberInput" />
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
    WizDateRangePicker,
    WizNumberInput,
  },
  setup() {
    const textInput = ref("");
    const passwordInput = ref("");
    const textareaInput = ref("");
    const SELECT_OPTIONS: SelectBoxOption[] = SELECT_BOX_CHOICES;
    const selectInput = ref(0);
    const checkBoxOptions: CheckBoxOption[] = [
      {
        label: "選択肢1",
        value: 1,
        key: "checkBoxErrorChoice1",
      },
      {
        label: "選択肢2",
        value: 2,
        key: "checkBoxErrorChoice2",
      },
    ];
    const checkboxInput = ref<number[]>([]);
    const radioOptions: RadioOption[] = [
      {
        label: "選択肢1",
        value: 1,
        key: "radioErrorChoice1",
      },
      {
        label: "選択肢2",
        value: 2,
        key: "radioErrorChoice2",
      },
    ];
    const radioInput = ref(0);
    const datePickerInput = ref(new Date(2021, 0, 1));
    const timePickerInput = ref("");
    const dateRangeInput = ref<DateRange>({
      start: null,
      end: null,
    });
    const selectBoxOptions = ref<DateRangePickerSelectBoxOption[]>([
      { label: "選択肢1", value: "1" },
      { label: "選択肢2", value: "2" },
      { label: "選択肢3", value: "3" },
    ]);
    const selectBoxInput = ref("");
    const numberInput = ref<number>();
    return {
      textInput,
      passwordInput,
      textareaInput,
      selectInput,
      SELECT_OPTIONS,
      checkboxInput,
      checkBoxOptions,
      radioInput,
      radioOptions,
      datePickerInput,
      timePickerInput,
      dateRangeInput,
      selectBoxOptions,
      selectBoxInput,
      numberInput,
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
        <WizCheckBox v-model="checkboxInput" name="checkboxInput" :options="checkBoxOptions" />
      </WizFormControl>
      <WizFormControl label="WizRadio" error="エラーが発生しました">
        <WizRadio v-model="radioInput" name="radioInput" :options="radioOptions" />
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
      <WizFormControl label="WizDateRangePicker" error="エラーが発生しました">
        <WizDateRangePicker v-model="dateRangeInput" name="dateRangeInput" :selectBoxOptions="selectBoxOptions" v-model:selectBoxValue="selectBoxInput" />
      </WizFormControl>
      <WizFormControl label="WizNumberInput" error="エラーが発生しました">
        <WizNumberInput v-model="numberInput" name="numberInput" />
      </WizFormControl>
    </WizFormGroup>
  `,
});
