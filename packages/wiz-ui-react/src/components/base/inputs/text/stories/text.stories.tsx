import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizISearch } from "@/components/icons";

import { WizTextInput } from "../components/text-input";

const meta: Meta<typeof WizTextInput> = {
  title: "Base/Input/Text",
  component: WizTextInput,
};

export default meta;
type Story = StoryObj<typeof WizTextInput>;

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

export const WithIcon: Story = {
  args: {
    icon: WizISearch,
    placeholder: "入力してください",
  },
};

export const Error: Story = {
  args: {
    placeholder: "入力してください",
    error: true,
  },
};

export const Test: Story = {
  args: {
    placeholder: "入力してください",
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
      <>
        <p>入力値：{value}</p>
        <WizTextInput {...args} onChangeValue={setValue} />
      </>
    );
  },
};
