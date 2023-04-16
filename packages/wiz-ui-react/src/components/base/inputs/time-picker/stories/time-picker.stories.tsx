import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizTimePicker } from "../components";

const meta: Meta<typeof WizTimePicker> = {
  title: "Base/Input/TimePicker",
  component: WizTimePicker,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizTimePicker>;

export const Default: Story = {
  render: (args) => {
    const [time, setTime] = useState("");
    return <WizTimePicker {...args} time={time} setTime={setTime} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [time, setTime] = useState("");
    return <WizTimePicker {...args} time={time} setTime={setTime} />;
  },
};
