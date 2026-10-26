/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
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

export const Expand: Story = {
  args: {
    date: new Date(2023, 0, 1),
    width: "100%",
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

export const Today: Story = {
  args: {
    date: new Date(2023, 0, 1),
    _today: new Date("2023-01-15"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.DATE_PICKER_INPUT).click();
  },
};

export const DisabledToday: Story = {
  args: {
    date: new Date(2023, 0, 1),
    disabledDate: (date: Date) => date.getDate() >= 10 && date.getDate() < 17,
    _today: new Date("2023-01-15"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.DATE_PICKER_INPUT).click();
  },
};

export const AllowInput: Story = {
  args: {
    allowInput: true,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(new Date(2026, 9, 20));
    return <WizDatePicker {...args} date={date} onChangeDate={setDate} />;
  },
};

export const TestAllowInput: Story = {
  args: {
    allowInput: true,
    disabledDate: (date: Date) => date.getFullYear() >= 2100,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(new Date(2026, 9, 20));
    return <WizDatePicker {...args} date={date} onChangeDate={setDate} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(
      ARIA_LABELS.DATE_PICKER_INPUT
    ) as HTMLInputElement;

    // フォーカス中は編集しやすい YYYY/MM/DD 表示になる
    await userEvent.click(input);
    await waitFor(() => expect(input.value).toBe("2026/10/20"));

    // 10年後の日付を入力して Enter で確定
    await userEvent.clear(input);
    await userEvent.type(input, "2036/10/20{enter}");
    await userEvent.tab();
    await waitFor(() => expect(input.value).toBe("2036年10月20日"));

    // 区切りなし8桁
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "20370105");
    await userEvent.tab();
    await waitFor(() => expect(input.value).toBe("2037年1月5日"));

    // 実在しない日付は元の値に戻る
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "2037/2/30");
    await userEvent.tab();
    await waitFor(() => expect(input.value).toBe("2037年1月5日"));

    // disabledDate で無効な日付は元の値に戻る
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "2100/01/01");
    await userEvent.tab();
    await waitFor(() => expect(input.value).toBe("2037年1月5日"));

    // 空にして確定すると未入力になる
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.tab();
    await waitFor(() => expect(input.value).toBe(""));
  },
};
