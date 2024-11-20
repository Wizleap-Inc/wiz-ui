import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizPanelSwitch } from "../components";
const meta: Meta<typeof WizPanelSwitch> = {
  title: "Base/PanelSwitch",
  component: WizPanelSwitch,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizPanelSwitch>;

const items = [
  { label: "test1", value: 1 },
  { label: "test2", value: 2 },
  { label: "test3", value: 3 },
  { label: "test4", value: 4 },
];

export const Default: Story = {
  args: {
    items,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<number | null>(null);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizPanelSwitch
          {...args}
          value={value}
          onChange={(changed) => {
            setValue(changed);
          }}
        />
      </div>
    );
  },
};

export const Width: Story = {
  args: {
    items,
    width: "300px",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<number | null>(null);
    return (
      <div>
        <p>入力値：{value}</p>
        <WizPanelSwitch
          {...args}
          value={value}
          onChange={(changed) => {
            setValue(changed);
          }}
        />
      </div>
    );
  },
};
