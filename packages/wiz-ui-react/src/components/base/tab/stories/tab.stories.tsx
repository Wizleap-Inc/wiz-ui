/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizTab } from "../components/";

const meta: Meta<typeof WizTab> = {
  title: "Base/Tab/Tab",
  component: WizTab,
};

export default meta;
type Story = StoryObj<typeof WizTab>;

const items = [
  {
    label: "ほげほげ",
    name: "hoge",
  },
  {
    label: "ふがふが",
    name: "fuga",
  },
  {
    label: "ぴよぴよ",
    name: "piyo",
  },
];

export const Default: Story = {
  args: {
    items,
  },
  render: (args) => {
    const [activeTabName, setActiveTabName] = useState(args.items[0].name);
    return (
      <WizTab
        {...args}
        activeTabName={activeTabName}
        onClickTab={(name) => setActiveTabName(name)}
        data-testid="tab-test"
      />
    );
  },
};

export const Gap: Story = {
  args: {
    gap: "sm",
    items,
  },
  render: (args) => {
    const [activeTabName, setActiveTabName] = useState(args.items[0].name);
    return (
      <WizTab
        {...args}
        activeTabName={activeTabName}
        onClickTab={(name) => setActiveTabName(name)}
      />
    );
  },
};

export const Width: Story = {
  args: {
    width: "200px",
    items,
  },
  render: (args) => {
    const [activeTabName, setActiveTabName] = useState(args.items[0].name);
    return (
      <WizTab
        {...args}
        activeTabName={activeTabName}
        onClickTab={(name) => setActiveTabName(name)}
      />
    );
  },
};

export const Center: Story = {
  args: {
    width: "200px",
    center: true,
    items,
  },
};

export const Playground: Story = {
  args: {
    items: [
      {
        label: "Basic",
        name: "basic",
      },
      {
        label: "Notification",
        name: "notification",
        notificationCount: 10,
      },
      {
        label: "Disabled",
        name: "disabled",
        disabled: true,
      },
    ],
  },
  render: (args) => {
    const [activeTabName, setActiveTabName] = useState(args.items[0].name);
    return (
      <div>
        <WizTab
          {...args}
          activeTabName={activeTabName}
          onClickTab={(name) => setActiveTabName(name)}
        />
        {activeTabName === "basic" && <div>Basicの中身</div>}
        {activeTabName === "notification" && <div>Notificationの中身</div>}
        {activeTabName === "disabled" && <div>Disabledの中身</div>}
      </div>
    );
  },
};
