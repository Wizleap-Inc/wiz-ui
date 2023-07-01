import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { WizTextArea } from "..";

const meta: Meta<typeof WizTextArea> = {
  title: "Base/TextArea",
  component: WizTextArea,
};

export default meta;
type Story = StoryObj<typeof WizTextArea>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    placeholder: "入力してください",
  },
};

export const Expand: Story = {
  args: {
    expand: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "入力してください",
  },
};

export const Row: Story = {
  args: {
    rows: 5,
    placeholder: "入力してください",
  },
};

export const Error: Story = {
  args: {
    error: true,
    placeholder: "入力してください",
  },
};

export const Test: Story = {
  args: {
    placeholder: "入力してください",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("入力してください");
    userEvent.click(textarea);
    await waitFor(() => expect(textarea).toHaveFocus());
    await waitFor(() =>
      expect(textarea).toHaveStyle(
        `border: 1px solid ${THEME.color.green[800]};`
      )
    );
    userEvent.type(textarea, "Hoge");
    await waitFor(() => expect(textarea).toHaveValue("Hoge"));
    userEvent.clear(textarea);
    await waitFor(() => expect(textarea).toHaveValue(""));
  },
};

export const Playground: Story = {
  args: {
    placeholder: "入力してください",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    return (
      <div>
        <p>入力値：{value}</p>
        <WizTextArea {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};