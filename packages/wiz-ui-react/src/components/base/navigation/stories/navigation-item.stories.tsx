import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter, Link } from "react-router-dom";

import { WizIDashboard } from "@/components/icons";

import { WizNavigationItem } from "../components";

const meta: Meta<typeof WizNavigationItem> = {
  title: "Base/Navigation/Item",
  component: WizNavigationItem,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizNavigationItem>;

const Template: Story = {
  render: (args) => (
    <BrowserRouter>
      <WizNavigationItem {...args} />
    </BrowserRouter>
  ),
};

export const Default: Story = {
  ...Template,
  args: {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
    active: false,
  },
};
export const ReactRouterLink: Story = {
  ...Template,
  args: {
    icon: WizIDashboard,
    label: "Home",
    active: false,
    as: Link,
    to: "/",
  },
};

export const Active: Story = {
  ...Template,
  args: {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
    active: true,
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
    disabled: true,
  },
};

export const WithToolTip: Story = {
  args: {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
    tooltipText: "これはヒントです。",
  },
  render: (args) => (
    <div style={{ marginTop: "48px" }}>
      <WizNavigationItem {...args} />
    </div>
  ),
};
