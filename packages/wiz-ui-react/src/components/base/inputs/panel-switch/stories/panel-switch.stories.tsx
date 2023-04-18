import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizPanelSwitch } from "../components";
const meta: Meta<typeof WizPanelSwitch> = {
  title: "Base/Input/PanelSwitch",
  component: WizPanelSwitch,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizPanelSwitch>;

export const Default: Story = {
  args: {
    items: [
      { label: "test1", value: 1 },
      { label: "test2", value: 2 },
      { label: "test3", value: 3 },
      { label: "test4", value: 4 },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState<number | null>(null);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizPanelSwitch {...args} value={value} setValue={setValue} />
      </div>
    );
  },
};
