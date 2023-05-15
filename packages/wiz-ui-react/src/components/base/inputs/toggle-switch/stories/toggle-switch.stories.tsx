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

export const Default: Story = {
  args: {},
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(false);
    return (
      <>
        <p>入力値: {value ? "true" : "false"}</p>
        <WizToggleSwitch {...args} value={value} setValue={setValue} />
      </>
    );
  },
};
