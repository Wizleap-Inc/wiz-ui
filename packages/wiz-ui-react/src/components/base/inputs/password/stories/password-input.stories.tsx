import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { WizPasswordInput } from "../components/password-input";

const meta: Meta<typeof WizPasswordInput> = {
  title: "Base/Input/Password",
  component: WizPasswordInput,
};

export default meta;
type Story = StoryObj<typeof WizPasswordInput>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    placeholder: "パスワードを入力",
  },
};

export const Expand: Story = {
  args: {
    expand: true,
    placeholder: "パスワードを入力",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "パスワードを入力",
  },
};

export const Error: Story = {
  args: {
    error: true,
    placeholder: "パスワードを入力",
  },
};

export const Test: Story = {
  args: {
    placeholder: "パスワードを入力",
  },
  play: async ({ canvasElement }) => {
    const DUMMY_PASSWORD = "example";
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("パスワードを入力");
    const visibleToggle = canvas.getByLabelText(
      ARIA_LABELS.PASSWORD_VISIBLE_TOGGLE
    );

    userEvent.click(input);
    await waitFor(() => expect(input).toHaveFocus());
    userEvent.type(input, DUMMY_PASSWORD);
    await waitFor(() => expect(input).toHaveAttribute("type", "password"));
    await waitFor(() => expect(input).toHaveValue(DUMMY_PASSWORD));
    userEvent.click(visibleToggle);
    await waitFor(() => expect(input).toHaveAttribute("type", "text"));
    await waitFor(() => expect(input).toHaveValue(DUMMY_PASSWORD));
  },
};

export const Playground: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState("");
    return (
      <div>
        <p>入力値：{password}</p>
        <WizPasswordInput {...args} value={password} onChange={setPassword} />
      </div>
    );
  },
};
