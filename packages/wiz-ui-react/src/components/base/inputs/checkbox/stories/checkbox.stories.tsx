/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizCheckBox } from "../components/checkbox";

const meta: Meta<typeof WizCheckBox> = {
  title: "Base/Input/CheckBox",
  component: WizCheckBox,
};

export default meta;
type Story = StoryObj<typeof WizCheckBox>;

const useControlledProps = (initValue: number[]) => {
  const [value, setValue] = useState<number[]>(initValue);
  const handleChange = (changed: number[]) => {
    setValue(changed);
  };
  return { value, handleChange };
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "",
      },
    },
  },
  args: {
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2" },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4" },
    ],
  },
  render: (args) => {
    const { value, handleChange } = useControlledProps([]);
    return (
      <div>
        <p>入力値：[{value.join(", ")}]</p>
        <WizCheckBox {...args} value={value} onChange={handleChange} />
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
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2" },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4" },
    ],
  },
  render: (args) => {
    const { value, handleChange } = useControlledProps([]);
    return (
      <div>
        <p>入力値：[{value.join(", ")}]</p>
        <WizCheckBox {...args} value={value} onChange={handleChange} />
      </div>
    );
  },
};

export const AllDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "",
      },
    },
  },
  args: {
    disabled: true,
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2" },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4" },
    ],
  },
  render: (args) => {
    const { value, handleChange } = useControlledProps([]);
    return (
      <div>
        <p>入力値：[{value.join(", ")}]</p>
        <WizCheckBox {...args} value={value} onChange={handleChange} />
      </div>
    );
  },
};

export const SpotDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "optionsの中にdisabledをtrueにすると、そのチェックボックスがdisabledになります。",
      },
    },
  },
  args: {
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2", disabled: true },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4", disabled: true },
    ],
  },
  render: (args) => {
    const { value, handleChange } = useControlledProps([]);
    return (
      <div>
        <p>入力値：[{value.join(", ")}]</p>
        <WizCheckBox {...args} value={value} onChange={handleChange} />
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
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2" },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4" },
    ],
    direction: "vertical",
  },
  render: (args) => {
    const { value, handleChange } = useControlledProps([]);
    return (
      <div>
        <p>入力値：[{value.join(", ")}]</p>
        <WizCheckBox {...args} value={value} onChange={handleChange} />
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
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2" },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4" },
    ],
    gap: "sm",
  },
  render: (args) => {
    const { value, handleChange } = useControlledProps([]);
    return (
      <div>
        <p>入力値：[{value.join(", ")}]</p>
        <WizCheckBox {...args} value={value} onChange={handleChange} />
      </div>
    );
  },
};

export const StrikeThrough: Story = {
  args: {
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2", disabled: true },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4", disabled: true },
    ],
    strikeThrough: true,
  },
  render: (args) => {
    const { value, handleChange } = useControlledProps([1, 2]);
    return (
      <div>
        <p>入力値：[{value.join(", ")}]</p>
        <WizCheckBox {...args} value={value} onChange={handleChange} />
      </div>
    );
  },
};
