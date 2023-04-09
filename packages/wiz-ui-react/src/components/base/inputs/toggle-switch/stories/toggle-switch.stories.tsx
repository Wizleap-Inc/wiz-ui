import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizToggleSwitch } from "../components/toggle-switch";

const meta: Meta<typeof WizToggleSwitch> = {
  title: "Base/Input/ToggleSwitch",
  component: WizToggleSwitch,
  argTypes: {
    value: {
      control: { type: "boolean" },
    },
    ariaLabel: {
      control: { type: "text" },
      defaultValue: "toggle switch",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizToggleSwitch>;

const useToggleButton = () => {
  const [value, setValue] = useState(false);
  const onChange = (value: boolean) => {
    setValue(value);
  };
  return { value, onChange };
};

export const Default: Story = {
  args: {},
  render: (args) => {
    const { value, onChange } = useToggleButton();
    return <WizToggleSwitch {...args} value={value} onChange={onChange} />;
  },
};
