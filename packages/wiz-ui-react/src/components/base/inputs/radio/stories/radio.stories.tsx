/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizRadio } from "../components/radio";

const meta: Meta<typeof WizRadio> = {
  title: "Base/Input/Radio",
  component: WizRadio,
};

export default meta;
type Story = StoryObj<typeof WizRadio>;

const useRadio = (initValues: number | null) => {
  const [value, setValue] = useState<number | null>(initValues);
  const onChange = (changedValue: number) => {
    setValue(changedValue);
  };
  return { value, onChange };
};

export const Default: Story = {
  args: {
    options: [
      { label: "test1", value: 1 },
      { label: "test2", value: 2 },
      { label: "test3", value: 3 },
      { label: "test4", value: 4 },
    ],
  },
  render: (args) => {
    const { value, onChange } = useRadio(1);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onChange={onChange} />
      </div>
    );
  },
};

export const Options: Story = {
  parameters: {
    docs: {
      description: {
        story: `
optionsには、labelとvalueとkeyを指定してください。
labelは表示される文字列、valueは入力値として使用されます。<br/>
keyはcheckboxのidとして使用されます。keyは一意である必要があります。
          `,
      },
    },
  },
  args: {
    options: [
      { label: "test1", value: 1 },
      { label: "test2", value: 2 },
      { label: "test3", value: 3 },
      { label: "test4", value: 4 },
    ],
  },
  render: (args) => {
    const { value, onChange } = useRadio(1);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onChange={onChange} />
      </div>
    );
  },
};

export const AllDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "disabledをtrueにすると、全てのradioがdisabledになります。",
      },
    },
  },
  args: {
    disabled: true,
    options: [
      { label: "test1", value: 1 },
      { label: "test2", value: 2 },
      { label: "test3", value: 3 },
      { label: "test4", value: 4 },
    ],
  },
  render: (args) => {
    const { value, onChange } = useRadio(1);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onChange={onChange} />
      </div>
    );
  },
};

export const SpotDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "optionsの中にdisabledをtrueにすると、そのradioがdisabledになります。",
      },
    },
  },
  args: {
    options: [
      { label: "test1", value: 1 },
      { label: "test2", value: 2, disabled: true },
      { label: "test3", value: 3 },
      { label: "test4", value: 4, disabled: true },
    ],
  },
  render: (args) => {
    const { value, onChange } = useRadio(1);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onChange={onChange} />
      </div>
    );
  },
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: "directionをverticalにすると、チェックボックスが縦に並びます。",
      },
    },
  },
  args: {
    options: [
      { label: "test1", value: 1 },
      { label: "test2", value: 2 },
      { label: "test3", value: 3 },
      { label: "test4", value: 4 },
    ],
    direction: "vertical",
  },
  render: (args) => {
    const { value, onChange } = useRadio(1);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onChange={onChange} />
      </div>
    );
  },
};

export const Gap: Story = {
  parameters: {
    docs: {
      description: {
        story: "gapを指定すると、チェックボックスの間に余白を設定できます。",
      },
    },
  },
  args: {
    options: [
      { label: "test1", value: 1 },
      { label: "test2", value: 2 },
      { label: "test3", value: 3 },
      { label: "test4", value: 4 },
    ],
    gap: "sm",
  },
  render: (args) => {
    const { value, onChange } = useRadio(1);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onChange={onChange} />
      </div>
    );
  },
};

export const StrikeThrough: Story = {
  parameters: {
    docs: {
      description: {},
    },
  },
  args: {
    options: [
      { label: "test1", value: 1 },
      { label: "test2", value: 2 },
      { label: "test3", value: 3 },
      { label: "test4", value: 4 },
    ],
    strikeThrough: true,
  },
  render: (args) => {
    const props1 = useRadio(1);
    const props2 = useRadio(1);

    return (
      <div>
        <p>入力値：{props1.value}</p>
        <WizRadio {...args} {...props1} />
        <p>入力値：{props2.value}</p>
        <WizRadio {...args} {...props2} disabled />
      </div>
    );
  },
};
