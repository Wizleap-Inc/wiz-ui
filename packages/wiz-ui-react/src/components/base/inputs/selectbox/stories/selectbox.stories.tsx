/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { fireEvent, within } from "@storybook/testing-library";
import { useState } from "react";

import { WizSelectBox } from "..";

const meta: Meta<typeof WizSelectBox> = {
  title: "Base/Input/SelectBox",
  component: WizSelectBox,
};

export default meta;
type Story = StoryObj<typeof WizSelectBox>;

const getDummyOptions = (label: string, length: number, exLabel?: string) => {
  return Array.from({ length }).map((_, i) => ({
    label: label + (i + 1),
    value: i + 1,
    exLabel,
  }));
};

const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | null>(null);
    return (
      <WizSelectBox
        {...args}
        value={value}
        onChange={(updated) => setValue(updated)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    fireEvent.click(canvas.getByRole("combobox"));
  },
};

export const Default: Story = {
  ...Template,
  args: {
    options: getDummyOptions("test", 3),
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    options: getDummyOptions("test", 3),
    disabled: true,
  },
};

export const LongLabel: Story = {
  ...Template,
  args: {
    options: getDummyOptions("ThisIsTooLongLabelThisIsTooLongLabel", 3),
  },
};

export const Expand: Story = {
  ...Template,
  args: {
    options: getDummyOptions("test", 3),
    expand: true,
  },
};

export const ManyOptions: Story = {
  ...Template,
  args: {
    options: getDummyOptions("test", 15),
  },
};

export const ExtraLabel: Story = {
  ...Template,
  args: {
    options: getDummyOptions("test", 3, "(10)"),
  },
};

export const IsDirectionFixed: Story = {
  ...Template,
  args: {
    options: getDummyOptions("test", 3),
    isDirectionFixed: true,
  },
};
