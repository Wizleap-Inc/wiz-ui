import { Meta, StoryObj } from "@storybook/react";
import { COLOR_MAP_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizDivider, Props } from "../components/divider";

const meta: Meta<typeof WizDivider> = {
  title: "Base/Divider",
  component: WizDivider,
  argTypes: {
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: { type: "select" },
      options: ["solid", "dashed", "dotted"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizDivider>;

const Template = (args: Props) => (
  <div
    style={{
      width: "300px",
      height: "300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "spaceBetween",
    }}
  >
    <WizDivider {...args} />
  </div>
);

export const Default: Story = {
  render: (args) => <Template {...args} />,
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
  },
  render: (args) => <Template {...args} />,
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
  },
  render: (args) => <Template {...args} />,
};

export const Solid: Story = {
  args: {
    variant: "solid",
  },
  render: (args) => <Template {...args} />,
};

export const Dashed: Story = {
  args: {
    variant: "dashed",
  },
  render: (args) => <Template {...args} />,
};

export const Dotted: Story = {
  args: {
    variant: "dotted",
  },
  render: (args) => <Template {...args} />,
};
