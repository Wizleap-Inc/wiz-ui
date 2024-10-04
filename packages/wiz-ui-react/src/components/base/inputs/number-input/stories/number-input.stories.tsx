/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
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
    const [value, setValue] = useState<number | null>(0);
    return (
      <>
        <WizNumberInput
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.valueAsNumber);
          }}
        />
        <div> value : {value} </div>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = canvas.getByRole("textbox");
    userEvent.click(textbox);
    textbox.blur();
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
