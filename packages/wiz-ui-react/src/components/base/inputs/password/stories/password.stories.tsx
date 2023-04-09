import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizPasswordInput } from "../components/password";

const meta: Meta<typeof WizPasswordInput> = {
  title: "Base/Input/Password",
  component: WizPasswordInput,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    id: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizPasswordInput>;

// const usePassword = () => {
//   const [password, setPassword] = useState("");
//   return {
//     password,
//     setPassword,
//   };
// };

export const Default: Story = {
  render: (args) => {
    const [password, setPassword] = useState("");
    return (
      <WizPasswordInput {...args} value={password} onChange={setPassword} />
    );
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "パスワードを入力",
  },
  render: (args) => {
    const [password, setPassword] = useState("");
    return (
      <WizPasswordInput {...args} value={password} onChange={setPassword} />
    );
  },
};

export const Expand: Story = {
  args: {
    expand: true,
    placeholder: "パスワードを入力",
  },
  render: (args) => {
    const [password, setPassword] = useState("");
    return (
      <WizPasswordInput {...args} value={password} onChange={setPassword} />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "パスワードを入力",
  },
  render: (args) => {
    const [password, setPassword] = useState("");
    return (
      <WizPasswordInput {...args} value={password} onChange={setPassword} />
    );
  },
};

export const PlayGround: Story = {
  args: {
    placeholder: "パスワードを入力",
  },
  render: (args) => {
    const [password, setPassword] = useState("");
    return (
      <>
        <p>入力値：{password}</p>
        <WizPasswordInput {...args} value={password} onChange={setPassword} />
      </>
    );
  },
};
