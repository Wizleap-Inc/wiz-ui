import { Meta, StoryObj } from "@storybook/react";
import {
  COLOR_MAP_ACCESSORS,
  FONT_SIZE_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";
import { ReactNode } from "react";

import { WizINotification } from "@/components/icons";
import * as Icons from "@/components/icons";

import { WizIcon } from "../components/icon";

const meta: Meta<typeof WizIcon> = {
  title: "Base/Icon",
  component: WizIcon,
  argTypes: {
    size: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    icon: {
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizIcon>;

export const Default: Story = {
  args: {
    icon: WizINotification,
  },
  render: (args) => <WizIcon {...args} />,
};

const Stack = ({ children }: { children?: ReactNode }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "max-content max-content",
      gridGap: "1rem",
      alignItems: "center",
    }}
  >
    {children}
  </div>
);

export const Size: Story = {
  args: {
    icon: WizINotification,
  },
  render: (args) => {
    const Icons = () =>
      FONT_SIZE_ACCESSORS.map((size) => (
        <>
          <div> Size = {size}</div>
          <WizIcon icon={args.icon} size={size} />
        </>
      ));
    return <Stack>{Icons()}</Stack>;
  },
};

export const Color: Story = {
  args: {
    icon: WizINotification,
  },
  render: (args) => {
    const Icons = () =>
      COLOR_MAP_ACCESSORS.map((color) => (
        <>
          <div>Color = {color}</div>
          <WizIcon icon={args.icon} color={color} />
        </>
      ));
    return <Stack>{Icons()}</Stack>;
  },
};

export const Icon: Story = {
  args: {},
  render: () => {
    const icons = () =>
      Object.values(Icons).map((icon) => (
        <>
          <div>Icon = {icon.displayName} </div>
          <WizIcon icon={icon} />
        </>
      ));
    return <Stack>{icons()}</Stack>;
  },
};
