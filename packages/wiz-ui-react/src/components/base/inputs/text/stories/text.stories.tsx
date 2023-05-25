import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizISearch } from "@/components/icons";

import { WizTextInput, Props } from "../components/text-input";

const meta: Meta<typeof WizTextInput> = {
  title: "Base/Input/Text",
  component: WizTextInput,
};

export default meta;
type Story = StoryObj<typeof WizTextInput>;

const Template = (args: Props) => <WizTextInput {...args} />;
const PlaygroundTemplate = (args: Props) => {
  const [value, setValue] = useState("");
  return (
    <>
      <p>入力値：{value}</p>
      <WizTextInput {...args} onChangeValue={setValue} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
};

export const Placeholder: Story = {
  args: {
    placeholder: "入力してください",
  },
  render: (args) => <Template {...args} />,
};

export const Expand: Story = {
  args: {
    expand: true,
  },
  render: (args) => <Template {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "入力してください",
  },
  render: (args) => <Template {...args} />,
};

export const WithIcon: Story = {
  args: {
    icon: WizISearch,
    placeholder: "入力してください",
  },
  render: (args) => <Template {...args} />,
};

export const Error: Story = {
  args: {
    placeholder: "入力してください",
    error: true,
  },
  render: (args) => <Template {...args} />,
};

export const Test: Story = {
  args: {
    placeholder: "入力してください",
  },
  render: (args) => <Template {...args} />,
};

export const Playground: Story = {
  args: {
    placeholder: "入力してください",
  },
  render: (args) => <PlaygroundTemplate {...args} />,
};
