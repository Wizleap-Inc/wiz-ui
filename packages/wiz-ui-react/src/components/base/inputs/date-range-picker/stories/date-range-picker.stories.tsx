/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { WizDateRangePicker } from "../components";
import { DateRange } from "../types";

const meta: Meta<typeof WizDateRangePicker> = {
  title: "Base/Input/DateRangePicker",
  component: WizDateRangePicker,
  argTypes: {},
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof WizDateRangePicker>;

export const Default: Story = {
  args: {
    dateRange: {
      start: null,
      end: null,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
  },
};

export const Disabled: Story = {
  args: {
    dateRange: {
      start: null,
      end: null,
    },
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
  },
};

export const DisabledWithValue: Story = {
  args: {
    dateRange: {
      start: new Date("2021-01-01"),
      end: new Date("2021-01-31"),
    },
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
  },
};

export const Expand: Story = {
  args: {
    dateRange: {
      start: null,
      end: null,
    },
    expand: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
  },
};

export const SelectBoxOptions: Story = {
  args: {
    dateRange: {
      start: null,
      end: null,
    },
    selectBoxOptions: [
      { label: "選択肢1", value: "1" },
      { label: "選択肢2", value: "2" },
      { label: "選択肢3", value: "3" },
    ],
  },
  render: (args) => {
    const [selectBoxValue, setSelectBoxValue] = useState<string | undefined>(
      undefined
    );
    return (
      <WizDateRangePicker
        {...args}
        selectBoxValue={selectBoxValue}
        onChangeSelectBoxValue={setSelectBoxValue}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
    within(document.body)
      .getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_SELECT_BOX_INPUT)
      .click();
  },
};

export const InitialValue: Story = {
  args: {
    dateRange: {
      start: new Date(2000, 0, 15),
      end: new Date(2000, 1, 15),
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
  },
};

export const InitialValue2: Story = {
  args: {
    dateRange: {
      start: new Date(2000, 0, 15),
      end: new Date(2000, 0, 15),
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
  },
};

export const InitialValueStart: Story = {
  args: {
    dateRange: {
      start: new Date(2000, 0, 15),
      end: null,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
  },
};

export const Hover: Story = {
  args: {
    dateRange: {
      start: new Date(2000, 0, 15),
      end: new Date(2000, 1, 15),
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
    userEvent.hover(canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT));
  },
};

export const Playground: Story = {
  args: {
    selectBoxOptions: [
      { label: "選択肢1", value: "1" },
      { label: "選択肢2", value: "2" },
      { label: "選択肢3", value: "3" },
    ],
  },
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange>({
      start: null,
      end: null,
    });
    const [selectBoxValue, setSelectBoxValue] = useState<string | undefined>(
      undefined
    );
    return (
      <WizDateRangePicker
        {...args}
        dateRange={dateRange}
        onChangeDateRange={setDateRange}
        selectBoxValue={selectBoxValue}
        onChangeSelectBoxValue={setSelectBoxValue}
      />
    );
  },
};
