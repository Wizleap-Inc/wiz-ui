import { Meta, StoryObj } from "@storybook/react";

import { WizSchedule } from "..";
import { Schedule } from "../types";

const meta: Meta<typeof WizSchedule> = {
  title: "Custom/Schedule",
  component: WizSchedule,
  argTypes: {
    startHour: {
      control: { type: "number" },
    },
    endHour: {
      control: { type: "number" },
    },
    schedules: {
      control: { type: "object" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof WizSchedule>;

const schedules = [
  {
    id: "1",
    col: 1,
    start: {
      hour: 9,
      minute: 0,
    },
    end: {
      hour: 9,
      minute: 15,
    },
    variant: "primary",
    text: "Schedule 1 (9:00 - 9:15)",
  },
  {
    id: "2",
    col: 1,
    start: {
      hour: 9,
      minute: 30,
    },
    end: {
      hour: 10,
      minute: 0,
    },
    variant: "secondary",
    text: "Schedule 2 (9:30 - 10:00)",
  },
  {
    id: "3",
    col: 1,
    start: {
      hour: 10,
      minute: 30,
    },
    end: {
      hour: 11,
      minute: 15,
    },
    variant: "tertiary",
    text: "Schedule 3 (10:30 - 11:15)",
  },
  {
    id: "4",
    col: 1,
    start: {
      hour: 12,
      minute: 0,
    },
    end: {
      hour: 13,
      minute: 0,
    },
    variant: "primary",
    text: "Schedule 4 (12:00 - 13:00)",
  },
  {
    id: "5",
    col: 1,
    start: {
      hour: 14,
      minute: 0,
    },
    end: {
      hour: 15,
      minute: 15,
    },
    variant: "secondary",
    text: "Schedule 5 (14:00 - 15:15)",
  },
  {
    id: "6",
    col: 1,
    start: {
      hour: 16,
      minute: 30,
    },
    end: {
      hour: 18,
      minute: 0,
    },
    variant: "tertiary",
    text: "Schedule 6 (16:30 - 18:00)",
  },
  {
    id: "7",
    col: 1,
    start: {
      hour: 19,
      minute: 30,
    },
    end: {
      hour: 21,
      minute: 15,
    },
    variant: "primary",
    text: "Schedule 7 (19:30 - 21:15)",
  },
  {
    id: "8",
    col: 2,
    start: {
      hour: 20,
      minute: 59,
    },
    end: {
      hour: 21,
      minute: 30,
    },
    variant: "primary",
    text: "Schedule 8 (20:59 - 21:30)",
  },
  {
    id: "9",
    col: 3,
    start: {
      hour: 8,
      minute: 0,
    },
    end: {
      hour: 21,
      minute: 59,
    },
    variant: "primary",
    text: "Schedule 9 (8:00 - 21:59)",
  },
  {
    id: "10",
    col: 4,
    start: {
      hour: 15,
      minute: 13,
    },
    end: {
      hour: 22,
      minute: 0,
    },
    variant: "primary",
    text: "Schedule 10 (15:28 - 22:00)",
  },
] satisfies Schedule;

export const Default: Story = {
  render: (args) => <WizSchedule {...args} />,
  args: {
    schedules,
  },
};
