import { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";

import { WizTextArea } from "../components/text-area";

const meta: Meta<typeof WizTextArea> = {
  title: "Base/TextArea",
  component: WizTextArea,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    expand: {
      control: {
        type: "boolean",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizTextArea>;

export const Default: Story = {
  render: (args) => <WizTextArea {...args} />,
};

export const Placeholder: Story = {
  args: {
    placeholder: "入力してください",
  },
  render: (args) => <WizTextArea {...args} />,
};

export const Expand: Story = {
  args: {
    expand: true,
  },
  render: (args) => <WizTextArea {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "入力してください",
  },
  render: (args) => <WizTextArea {...args} />,
};

export const Row: Story = {
  args: {
    rows: 5,
    placeholder: "入力してください",
  },
  render: (args) => <WizTextArea {...args} />,
};

export const Test: Story = {
  args: {
    placeholder: "入力してください",
  },
  render: (args) => <WizTextArea {...args} />,
};

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const handleClick = () => {
      textAreaRef.current?.focus();
    };
    return (
      <>
        <p>入力値：{value}</p>
        <WizTextArea
          {...args}
          ref={textAreaRef}
          onChange={(e) => setValue(e.target.value)}
        />
        <div>
          <button onClick={handleClick}>focus</button>
        </div>
      </>
    );
  },
};
