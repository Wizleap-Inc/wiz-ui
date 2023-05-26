import { Meta, StoryObj } from "@storybook/react";

import { WizScheduleCard } from "..";

const meta: Meta<typeof WizScheduleCard> = {
  title: "Custom/Schedule/Card",
  component: WizScheduleCard,
  argTypes: {
    text: {
      control: { type: "text" },
    },
    gridRow: {
      control: { type: "text" },
    },
    gridColumn: {
      control: { type: "text" },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "repeat(24, 6px)",
          width: "30rem",
          position: "relative",
          background: "#eee",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof WizScheduleCard>;

const COMMON_ARGS = {
  text: "Hello World",
  gridRow: "11 / 14",
  gridColumn: "3 / 6",
};

export const Primary: Story = {
  args: {
    ...COMMON_ARGS,
  },
  render: (args) => <WizScheduleCard {...args} />,
};

export const Secondary: Story = {
  args: {
    ...COMMON_ARGS,
    variant: "secondary",
  },
  render: (args) => <WizScheduleCard {...args} />,
};

export const Tertiary: Story = {
  args: {
    ...COMMON_ARGS,
    variant: "tertiary",
  },
  render: (args) => <WizScheduleCard {...args} />,
};
