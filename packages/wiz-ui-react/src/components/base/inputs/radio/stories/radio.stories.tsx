import { Meta, StoryObj } from "@storybook/react";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { WizRadio } from "../components/radio";

const meta: Meta<typeof WizRadio> = {
  title: "Base/Input/Radio",
  component: WizRadio,
  argTypes: {
    options: {
      control: { type: "object" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    onSelect: {
      action: "input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizRadio>;

const useRadio = (initValues: number | null) => {
  const [value, setValue] = useState<number | null>(initValues);
  const onSelect = (value: number) => {
    console.log(value);
    setValue(value);
  };
  return { value, onSelect };
};

export const Default: Story = {
  args: {
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2" },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4" },
    ],
  },
  render: (args) => {
    const { value, onSelect } = useRadio(1);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onSelect={onSelect} />
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
      { label: "test1", value: 1, key: "options1" },
      { label: "test2", value: 2, key: "options2" },
      { label: "test3", value: 3, key: "options3" },
      { label: "test4", value: 4, key: "options4" },
    ],
  },
  render: (args) => {
    const { value, onSelect } = useRadio(null);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onSelect={onSelect} />
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
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2" },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4" },
    ],
  },
  render: (args) => {
    const { value, onSelect } = useRadio(null);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onSelect={onSelect} />
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
      { label: "test1", value: 1, key: "spotDisabled1" },
      { label: "test2", value: 2, key: "spotDisabled2", disabled: true },
      { label: "test3", value: 3, key: "spotDisabled3" },
      { label: "test4", value: 4, key: "spotDisabled4", disabled: true },
    ],
  },
  render: (args) => {
    const { value, onSelect } = useRadio(null);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onSelect={onSelect} />
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
      { label: "test1", value: 1, key: "vertical1" },
      { label: "test2", value: 2, key: "vertical2" },
      { label: "test3", value: 3, key: "vertical3" },
      { label: "test4", value: 4, key: "vertical4" },
    ],
    direction: "vertical",
  },
  render: (args) => {
    const { value, onSelect } = useRadio(null);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onSelect={onSelect} />
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
      { label: "test1", value: 1, key: "gap1" },
      { label: "test2", value: 2, key: "gap2" },
      { label: "test3", value: 3, key: "gap3" },
      { label: "test4", value: 4, key: "gap4" },
    ],
    gap: "sm",
  },
  render: (args) => {
    const { value, onSelect } = useRadio(0);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onSelect={onSelect} />
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
      { label: "test1", value: 1, key: "strike1" },
      { label: "test2", value: 2, key: "strike2" },
      { label: "test3", value: 3, key: "strike3" },
      { label: "test4", value: 4, key: "strike4" },
    ],
    strikeThrough: true,
  },
  render: (args) => {
    const { value, onSelect } = useRadio(null);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizRadio {...args} value={value} onSelect={onSelect} />
      </div>
    );
  },
};
