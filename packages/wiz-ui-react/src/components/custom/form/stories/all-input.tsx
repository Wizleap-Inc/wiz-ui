import { ComponentProps, useState } from "react";

import {
  WizCheckBox,
  WizRadio,
  WizSelectBox,
  WizTextInput,
  WizTimePicker,
} from "@/components";
import { WizNumberInput } from "@/components/base/inputs/number-input";

import { WizFormControl, WizFormGroup } from "..";

import { Story } from "./form-group.stories";

const TemplateComponent = ({
  args,
  direction,
  error,
}: {
  args: ComponentProps<typeof WizFormGroup>;
  direction?: "horizontal" | "vertical";
  error?: string;
}) => {
  const [selectBoxValue, setSelectBoxValue] = useState<number | null>(null);
  const [checkBoxValues, setCheckBoxValues] = useState<number[]>([]);
  const [radioValue, setRadioValue] = useState<number | null>(null);
  const [numberValue, setNumberValue] = useState<number | undefined>(undefined);
  const [timePickerValue, setTimePickerValue] =
    useState<ComponentProps<typeof WizTimePicker>["time"]>(null);
  return (
    <WizFormGroup {...args}>
      <WizFormControl label="WizTextInput" direction={direction} error={error}>
        <WizTextInput placeholder="入力してください" />
      </WizFormControl>
      {/* TODO: WizPasswordInput 追加待ち */}
      <WizFormControl label="WizSelectBox" direction={direction} error={error}>
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
      <WizFormControl label="WizCheckBox" direction={direction} error={error}>
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
      <WizFormControl label="WizRadio" direction={direction} error={error}>
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
      <WizFormControl label="WizTimePicker" direction={direction} error={error}>
        <WizTimePicker
          time={timePickerValue}
          onChange={(time) => setTimePickerValue(time)}
        />
      </WizFormControl>
      {/* TODO: WizTextarea 追加待ち */}
      {/* TODO: WizDateRangePicker 追加待ち */}
      <WizFormControl
        label="WizNumberInput"
        direction={direction}
        error={error}
      >
        <WizNumberInput value={numberValue} onChange={setNumberValue} />
      </WizFormControl>
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

export const AllInputVerticalAlinedStory: Story = {
  args: {
    labelWidth: "10rem",
    gap: "xl2",
  },
  render: (args) => <TemplateComponent args={args} direction="vertical" />,
};
export const AllInputErrorVerticalAlinedStory: Story = {
  args: {
    labelWidth: "10rem",
    gap: "xl2",
  },
  render: (args) => (
    <TemplateComponent
      args={args}
      direction="vertical"
      error="エラーが発生しました"
    />
  ),
};
