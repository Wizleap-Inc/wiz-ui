/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { WizDatePicker } from "../components";

const meta: Meta<typeof WizDatePicker> = {
  title: "Base/Input/DatePicker",
  component: WizDatePicker,
  argTypes: {},
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof WizDatePicker>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    placeholder: "(例) 2000/1/1",
  },
};

export const Disabled: Story = {
  args: {
    date: new Date(2023, 0, 1),
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.DATE_PICKER_INPUT).click();
  },
};

export const DisabledDate: Story = {
  args: {
    date: new Date(2023, 0, 1),
    disabledDate: (date: Date) => date.getDate() >= 10 && date.getDate() < 17,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.DATE_PICKER_INPUT).click();
  },
};

export const WithValue: Story = {
  args: {
    date: new Date(2023, 0, 1),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.DATE_PICKER_INPUT).click();
  },
};

export const Hover: Story = {
  args: {
    date: new Date(2023, 0, 1),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.hover(canvas.getByLabelText(ARIA_LABELS.DATE_PICKER_INPUT));
  },
};

export const IsDirectionFixed: Story = {
  args: {
    date: new Date(2023, 0, 1),
    isDirectionFixed: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.DATE_PICKER_INPUT).click();
  },
};

export const YearStyle: Story = {
  args: {
    date: new Date(2023, 0, 1),
    formatYear: (year: number) => `西暦${year}`,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.DATE_PICKER_INPUT).click();
  },
};

export const Playground: Story = {
  args: {
    disabledDate: (date: Date) => date.getDate() >= 10 && date.getDate() < 17,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    return <WizDatePicker {...args} date={date} onChangeDate={setDate} />;
  },
};
