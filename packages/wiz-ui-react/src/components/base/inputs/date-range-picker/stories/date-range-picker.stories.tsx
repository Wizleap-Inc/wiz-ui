/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
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
      start: new Date("2021-01-15"),
      end: new Date("2021-02-15"),
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

export const DisabledDate: Story = {
  args: {
    dateRange: {
      start: new Date("2021-01-01"),
      end: new Date("2021-01-31"),
    },
    disabledDate: (date: Date) => date.getDate() >= 10 && date.getDate() < 17,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
  },
};

export const Expand: Story = {
  args: {
    dateRange: {
      start: new Date(2000, 0, 15),
      end: new Date(2000, 1, 15),
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
      start: new Date(2000, 0, 15),
      end: new Date(2000, 1, 15),
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

export const Mini: Story = {
  args: {
    dateRange: {
      start: new Date(2000, 0, 15),
      end: null,
    },
    variant: "mini",
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

export const Today: Story = {
  args: {
    dateRange: {
      start: new Date("2021-01-15"),
      end: new Date("2021-02-15"),
    },
    _today: new Date("2021-01-28"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
  },
};

export const DisabledWithToday: Story = {
  args: {
    dateRange: {
      start: new Date("2021-01-01"),
      end: new Date("2021-01-31"),
    },
    disabledDate: (date: Date) => date.getDate() >= 10 && date.getDate() < 17,
    _today: new Date("2021-01-15"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT).click();
  },
};

const AllowInputRender: Story["render"] = (args) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(2026, 9, 20),
    end: new Date(2026, 10, 20),
  });
  return (
    <WizDateRangePicker
      {...args}
      dateRange={dateRange}
      onChangeDateRange={setDateRange}
    />
  );
};

export const AllowInput: Story = {
  args: {
    allowInput: true,
  },
  render: AllowInputRender,
};

export const TestAllowInput: Story = {
  args: {
    allowInput: true,
    disabledDate: (date: Date) => date.getFullYear() >= 2100,
  },
  render: AllowInputRender,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const start = canvas.getByLabelText(
      ARIA_LABELS.RANGE_DATE_PICKER_START_INPUT
    ) as HTMLInputElement;
    const end = canvas.getByLabelText(
      ARIA_LABELS.RANGE_DATE_PICKER_END_INPUT
    ) as HTMLInputElement;

    // フォーカスしても表示と同じ形式のまま編集できる
    await userEvent.click(start);
    await waitFor(() => expect(start.value).toBe("2026年10月20日"));

    // 開始日を入力して Enter で確定
    await userEvent.clear(start);
    await userEvent.type(start, "2026/11/01{enter}");
    await userEvent.tab();
    await waitFor(() => expect(start.value).toBe("2026年11月1日"));

    // 終了日を入力して確定（10年後）
    await userEvent.click(end);
    await userEvent.clear(end);
    await userEvent.type(end, "20361020");
    await userEvent.tab();
    await waitFor(() => expect(end.value).toBe("2036年10月20日"));

    // 開始日が終了日より後になる入力は元の値に戻る
    await userEvent.click(start);
    await userEvent.clear(start);
    await userEvent.type(start, "2037/01/01");
    await userEvent.tab();
    await waitFor(() => expect(start.value).toBe("2026年11月1日"));

    // 終了日が開始日より前になる入力は元の値に戻る
    await userEvent.click(end);
    await userEvent.clear(end);
    await userEvent.type(end, "2026/01/01");
    await userEvent.tab();
    await waitFor(() => expect(end.value).toBe("2036年10月20日"));

    // 実在しない日付は元の値に戻る
    await userEvent.click(end);
    await userEvent.clear(end);
    await userEvent.type(end, "2036/2/30");
    await userEvent.tab();
    await waitFor(() => expect(end.value).toBe("2036年10月20日"));

    // disabledDate で無効な日付は元の値に戻る
    await userEvent.click(end);
    await userEvent.clear(end);
    await userEvent.type(end, "2100/01/01");
    await userEvent.tab();
    await waitFor(() => expect(end.value).toBe("2036年10月20日"));

    // 終了日を空にすると、開始日だけが残る
    await userEvent.click(end);
    await userEvent.clear(end);
    await userEvent.tab();
    await waitFor(() => expect(end.value).toBe(""));
    await waitFor(() => expect(start.value).toBe("2026年11月1日"));

    // 開始日を空にすると、範囲全体が未入力になる
    await userEvent.click(start);
    await userEvent.clear(start);
    await userEvent.tab();
    await waitFor(() => expect(start.value).toBe(""));

    // 開始日がないまま終了日は入力できない
    await userEvent.click(end);
    await userEvent.type(end, "2030/01/01");
    await userEvent.tab();
    await waitFor(() => expect(end.value).toBe(""));

    // 開始日だけを入力できる
    await userEvent.click(start);
    await userEvent.type(start, "2030/01/01");
    await userEvent.tab();
    await waitFor(() => expect(start.value).toBe("2030年1月1日"));
  },
};
