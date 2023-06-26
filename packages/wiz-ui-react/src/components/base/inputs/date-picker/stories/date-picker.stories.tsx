/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizDatePicker } from "../components";

const meta: Meta<typeof WizDatePicker> = {
  title: "Base/DatePicker",
  component: WizDatePicker,
  argTypes: {},
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof WizDatePicker>;

export const Playground: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);

    return <WizDatePicker {...args} date={date} onClickDate={setDate} />;
  },
};
