/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { fireEvent, within } from "@storybook/test";
import { useState } from "react";

import { WizSelectBox } from "..";

const meta: Meta<typeof WizSelectBox> = {
  title: "Base/Input/SelectBox",
  component: WizSelectBox,
};

export default meta;
type Story = StoryObj<typeof WizSelectBox<number>>;

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
        data-testid="selectbox-test"
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

export const DisabledItems: Story = {
  ...Template,
  args: {
    options: getDummyOptions("test", 3).map((option, index) => ({
      ...option,
      disabled: index % 2 === 0,
    })),
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
  args: {
    options: getDummyOptions("test", 3, "(10)"),
    value: 1,
  },
  render: (args) => {
    const [value, setValue] = useState<number | null>(args.value);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <div>
          <h5>showExLabel = false</h5>
          <WizSelectBox
            {...args}
            value={value}
            showExLabel={false}
            onChange={(updated) => setValue(updated)}
          />
        </div>
        <div>
          <h5>showExLabel = true</h5>
          <WizSelectBox
            {...args}
            value={value}
            showExLabel={true}
            onChange={(updated) => setValue(updated)}
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    fireEvent.click(canvas.getAllByRole("combobox")[0]);
  },
};

export const IsDirectionFixed: Story = {
  ...Template,
  args: {
    options: getDummyOptions("test", 3),
    isDirectionFixed: true,
  },
};

export const DropdownMaxHeight: Story = {
  ...Template,
  args: {
    options: getDummyOptions("test", 3),
    dropdownMaxHeight: "75px",
  },
};

export const Mini: Story = {
  ...Template,
  args: {
    options: getDummyOptions("test", 3),
    variant: "mini",
  },
};
