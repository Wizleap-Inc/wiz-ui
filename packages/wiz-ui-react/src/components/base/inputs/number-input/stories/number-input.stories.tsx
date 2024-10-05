/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizNumberInput } from "..";

const meta: Meta<typeof WizNumberInput> = {
  title: "Base/Input/NumberInput",
  component: WizNumberInput,
};

export default meta;
type Story = StoryObj<typeof WizNumberInput>;

const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | null>(args.value);
    return (
      <>
        <WizNumberInput {...args} value={value} onChange={setValue} />
        <div> value : {value} </div>
      </>
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {},
};

export const Placeholder: Story = {
  ...Template,
  args: {
    placeholder: "数字を入力",
  },
};

export const WithValue: Story = {
  ...Template,
  args: {
    value: 100,
  },
};
export const Disabled: Story = {
  ...Template,
  args: {
    value: 100,
    disabled: true,
  },
};
