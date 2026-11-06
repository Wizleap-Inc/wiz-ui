/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { expect, fireEvent, userEvent, waitFor, within } from "@storybook/test";
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { WizTimePicker } from "../components";
import { Time } from "../types/time";

const meta: Meta<typeof WizTimePicker> = {
  title: "Base/Input/TimePicker",
  component: WizTimePicker,
};

export default meta;
type Story = StoryObj<typeof WizTimePicker>;

export const Default: Story = {
  render: (args) => {
    const [time, setTime] = useState<Time | null>(null);
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    fireEvent.click(canvas.getByRole("button"));
  },
};

export const Hover: Story = {
  render: (args) => {
    const [time, setTime] = useState<Time | null>({ hour: 8, minute: 15 });
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await fireEvent.click(button);
    await fireEvent.mouseOver(button);
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [time, setTime] = useState<Time | null>(null);
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await fireEvent.click(button);
  },
};

export const Expand: Story = {
  args: {
    width: "100%",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await fireEvent.click(canvas.getByRole("button"));
  },
};

export const MinuteInterval: Story = {
  args: {
    minuteInterval: 1,
  },
  render: (args) => {
    const [time, setTime] = useState<Time | null>(null);
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    fireEvent.click(canvas.getByRole("button"));
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
  render: (args) => {
    const [time, setTime] = useState<Time | null>(null);
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
};

export const isDirectionFixed: Story = {
  args: {
    isDirectionFixed: true,
  },
  render: (args) => {
    const [time, setTime] = useState<Time | null>(null);
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await fireEvent.click(button);
  },
};

export const AllowInput: Story = {
  args: {
    allowInput: true,
  },
  render: (args) => {
    const [time, setTime] = useState<Time | null>({ hour: 9, minute: 5 });
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
};

export const TestAllowInput: Story = {
  args: {
    allowInput: true,
  },
  render: (args) => {
    const [time, setTime] = useState<Time | null>({ hour: 9, minute: 5 });
    return <WizTimePicker {...args} time={time} onChange={setTime} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(
      ARIA_LABELS.TIME_PICKER_INPUT
    ) as HTMLInputElement;

    // フォーカスしても表示と同じ形式のまま編集できる
    await userEvent.click(input);
    await waitFor(() => expect(input.value).toBe("9:05"));

    // 時刻を入力して Enter で確定
    await userEvent.clear(input);
    await userEvent.type(input, "10:30{enter}");
    await userEvent.tab();
    await waitFor(() => expect(input.value).toBe("10:30"));

    // 区切りなし
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "1145");
    await userEvent.tab();
    await waitFor(() => expect(input.value).toBe("11:45"));

    // 日本語表記
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "12時15分");
    await userEvent.tab();
    await waitFor(() => expect(input.value).toBe("12:15"));

    // 存在しない時刻は元の値に戻る
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "25:00");
    await userEvent.tab();
    await waitFor(() => expect(input.value).toBe("12:15"));

    // minuteInterval の刻みに合わない時刻は元の値に戻る
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "10:07");
    await userEvent.tab();
    await waitFor(() => expect(input.value).toBe("12:15"));

    // 空にして確定すると未入力になる
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.tab();
    await waitFor(() => expect(input.value).toBe(""));
  },
};
