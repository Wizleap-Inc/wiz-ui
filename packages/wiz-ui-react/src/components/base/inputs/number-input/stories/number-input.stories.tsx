/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import { WizNumberInput } from "..";

const meta: Meta<typeof WizNumberInput> = {
  title: "Base/Input/NumberInput",
  component: WizNumberInput,
};

export default meta;
type Story = StoryObj<typeof WizNumberInput>;

const Template: Story = {
  render: (args) => {
    return (
      <div>
        <WizNumberInput {...args} />
      </div>
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
