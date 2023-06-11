/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizTimePicker } from "../components";

const meta: Meta<typeof WizTimePicker> = {
  title: "Base/Input/TimePicker",
  component: WizTimePicker,
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ height: "20rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WizTimePicker>;

export const Default: Story = {
  render: (args) => {
    const [time, setTime] = useState("");
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [time, setTime] = useState("");
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
};

export const isDirectionFixed: Story = {
  args: {
    isDirectionFixed: true,
  },
  render: (args) => {
    const [time, setTime] = useState("");
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
};
