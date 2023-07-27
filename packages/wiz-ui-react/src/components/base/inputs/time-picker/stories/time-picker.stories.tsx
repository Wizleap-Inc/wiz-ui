/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { fireEvent, within } from "@storybook/testing-library";
import { useState } from "react";

import { WizTimePicker } from "../components";
import { Time } from "../types/time";

const meta: Meta<typeof WizTimePicker> = {
  title: "Base/Input/TimePicker",
  component: WizTimePicker,
};

export default meta;
type Story = StoryObj<typeof WizTimePicker>;

export const Default: Story = {
  render: (args) => {
    const [time, setTime] = useState<Time | null>(null);
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    fireEvent.click(canvas.getByRole("button"));
  },
};

export const Hover: Story = {
  render: (args) => {
    const [time, setTime] = useState<Time | null>({ hour: 8, minute: 15 });
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await fireEvent.click(button);
    await fireEvent.mouseOver(button);
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [time, setTime] = useState<Time | null>(null);
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await fireEvent.click(button);
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
  render: (args) => {
    const [time, setTime] = useState<Time | null>(null);
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
};

export const isDirectionFixed: Story = {
  args: {
    isDirectionFixed: true,
  },
  render: (args) => {
    const [time, setTime] = useState<Time | null>(null);
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await fireEvent.click(button);
  },
};
