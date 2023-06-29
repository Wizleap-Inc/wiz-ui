/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizDateRangePicker } from "../components";
import { DateRange } from "../types";

const meta: Meta<typeof WizDateRangePicker> = {
  title: "Base/DateRangePicker",
  component: WizDateRangePicker,
  argTypes: {},
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof WizDateRangePicker>;

export const Playground: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange>({
      start: null,
      end: null,
    });
    return (
      <WizDateRangePicker
        {...args}
        value={dateRange}
        setDateRange={setDateRange}
      />
    );
  },
};
