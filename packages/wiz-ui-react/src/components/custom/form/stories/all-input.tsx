import { ComponentProps, useState } from "react";

import {
  WizCheckBox,
  WizRadio,
  WizSelectBox,
  WizTextInput,
  WizTimePicker,
} from "@/components";

import { WizFormControl, WizFormGroup } from "..";

import { Story } from "./form-group.stories";

const TemplateComponent = ({
  args,
  error,
}: {
  args: ComponentProps<typeof WizFormGroup>;
  error?: string;
}) => {
  const [selectBoxValue, setSelectBoxValue] = useState<number | null>(null);
  const [checkBoxValues, setCheckBoxValues] = useState<number[]>([]);
  const [radioValue, setRadioValue] = useState<number | null>(null);
  const [timePickerValue, setTimePickerValue] =
    useState<ComponentProps<typeof WizTimePicker>["time"]>(null);
  return (
    <WizFormGroup {...args}>
      <WizFormControl label="WizTextInput" error={error}>
        <WizTextInput placeholder="入力してください" />
      </WizFormControl>
      {/* TODO: WizPasswordInput 追加待ち */}
      <WizFormControl label="WizSelectBox" error={error}>
        <WizSelectBox
          value={selectBoxValue}
          onChange={(value) => setSelectBoxValue(value)}
          options={[
            {
              label: "選択肢1",
              value: 1,
            },
            {
              label: "選択肢2",
              value: 2,
            },
          ]}
        />
      </WizFormControl>
      <WizFormControl label="WizCheckBox" error={error}>
        <WizCheckBox
          values={checkBoxValues}
          onChange={(values) => setCheckBoxValues(values)}
          options={[
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
          ]}
        />
      </WizFormControl>
      <WizFormControl label="WizRadio" error={error}>
        <WizRadio
          value={radioValue}
          onChange={(value) => setRadioValue(value)}
          options={[
            {
              label: "選択肢1",
              value: 1,
            },
            {
              label: "選択肢2",
              value: 2,
            },
          ]}
        />
      </WizFormControl>
      {/* TODO: DatePicker 追加待ち */}
      <WizFormControl label="WizTimePicker" error={error}>
        <WizTimePicker
          time={timePickerValue}
          onChange={(time) => setTimePickerValue(time)}
        />
      </WizFormControl>
      {/* TODO: WizTextarea 追加待ち */}
      {/* TODO: WizDateRangePicker 追加待ち */}
    </WizFormGroup>
  );
};

export const AllInputStory: Story = {
  args: {
    labelWidth: "10rem",
    gap: "xl2",
  },
  render: (args) => <TemplateComponent args={args} />,
};

export const AllInputErrorStory: Story = {
  args: {
    labelWidth: "10rem",
    gap: "xl2",
  },
  render: (args) => (
    <TemplateComponent args={args} error="エラーが発生しました" />
  ),
};
