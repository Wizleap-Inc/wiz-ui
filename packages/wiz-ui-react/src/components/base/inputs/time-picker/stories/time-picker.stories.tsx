/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizTimePicker } from "../components";
import { Time } from "../types/time";

const meta: Meta<typeof WizTimePicker> = {
  title: "Base/Input/TimePicker",
  component: WizTimePicker,
  argTypes: {
    placeholder: {
      control: {
        type: "text",
      },
    },
    width: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    isDirectionFixed: {
      control: {
        type: "boolean",
      },
    },
  },
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
    const [time, setTime] = useState<Time>({ hour: null, minute: null });
    const [isOpen, setIsOpen] = useState(true);
    const [isHover, setIsHover] = useState(false);
    return (
      <WizTimePicker
        {...args}
        time={time}
        isOpen={isOpen}
        isHover={isHover}
        onChange={setTime}
        setIsOpen={setIsOpen}
        setIsHover={setIsHover}
      />
    );
  },
};

export const Hover: Story = {
  render: (args) => {
    const [time, setTime] = useState<Time>({ hour: 8, minute: 15 });
    const [isOpen, setIsOpen] = useState(true);
    const [isHover, setIsHover] = useState(true);
    return (
      <WizTimePicker
        {...args}
        time={time}
        isOpen={isOpen}
        isHover={isHover}
        onChange={setTime}
        setIsOpen={setIsOpen}
        setIsHover={setIsHover}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [time, setTime] = useState<Time>({ hour: null, minute: null });
    const [isOpen, setIsOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);
    return (
      <WizTimePicker
        {...args}
        time={time}
        isOpen={isOpen}
        isHover={isHover}
        onChange={setTime}
        setIsOpen={setIsOpen}
        setIsHover={setIsHover}
      />
    );
  },
};

export const isDirectionFixed: Story = {
  args: {
    isDirectionFixed: true,
  },
  render: (args) => {
    const [time, setTime] = useState<Time>({ hour: null, minute: null });
    const [isOpen, setIsOpen] = useState(true);
    const [isHover, setIsHover] = useState(false);
    return (
      <WizTimePicker
        {...args}
        time={time}
        isOpen={isOpen}
        isHover={isHover}
        onChange={setTime}
        setIsOpen={setIsOpen}
        setIsHover={setIsHover}
      />
    );
  },
};
