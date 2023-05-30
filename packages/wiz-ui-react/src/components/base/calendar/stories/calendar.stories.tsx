/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";

import { WizCalendar } from "../components";

const meta: Meta<typeof WizCalendar> = {
  title: "Base/Calendar",
  component: WizCalendar,
};

export default meta;
type Story = StoryObj<typeof WizCalendar>;

const Template: Story = {
  render: (args) => (
    <div>
      <p>
        表示している月: {args.currentMonth?.getFullYear()}年
        {(args.currentMonth?.getMonth() ?? 0) + 1}月
      </p>
      <WizCalendar {...args} />
    </div>
  ),
};

export const Default: Story = {
  ...Template,
  args: {
    currentMonth: new Date("2023-03"),
  },
};

export const CurrentMonth: Story = {
  ...Template,
  args: {
    currentMonth: new Date("2021-01"),
  },
};

export const ActiveDates: Story = {
  ...Template,
  args: {
    currentMonth: new Date("2021-01"),
    activeDates: [
      {
        date: new Date("2021-01-11"),
        state: "primary",
      },
      {
        date: new Date("2021-01-12"),
        state: "secondary",
      },
      {
        date: new Date("2021-01-13"),
        state: "secondary",
      },
      {
        date: new Date("2021-01-14"),
        state: "secondary",
      },
      {
        date: new Date("2021-01-15"),
        state: "primary",
      },
    ],
  },
};

export const FilledWeeks: Story = {
  ...Template,
  args: {
    currentMonth: new Date("2023-03"),
    filledWeeks: true,
  },
};
