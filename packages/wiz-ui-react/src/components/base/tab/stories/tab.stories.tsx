import { Meta, StoryObj } from "@storybook/react";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { WizTab } from "../components/";

const meta: Meta<typeof WizTab> = {
  title: "Base/Tab/Tab",
  component: WizTab,
  argTypes: {
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    items: {
      control: { type: "array" },
    },
    width: {
      control: { type: "text" },
    },
    activeTabName: {
      control: { type: "text" },
    },
    setActiveTabName: {
      action: "click",
    },
  },
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
        setActiveTabName={setActiveTabName}
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
        setActiveTabName={setActiveTabName}
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
        setActiveTabName={setActiveTabName}
      />
    );
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
          setActiveTabName={setActiveTabName}
        />
        {activeTabName === "basic" && <div>Basic</div>}
        {activeTabName === "notification" && <div>Notification</div>}
        {activeTabName === "disabled" && <div>Disabled</div>}
      </div>
    );
  },
};
