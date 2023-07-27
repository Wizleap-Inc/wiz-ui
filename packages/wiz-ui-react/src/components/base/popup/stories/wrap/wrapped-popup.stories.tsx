import { Meta, StoryObj } from "@storybook/react";

import { WizPopup } from "../../components";

import { PopupWrapTemplate } from "./template";
const meta: Meta<typeof WizPopup> = {
  title: "Base/Popup/Wrap",
  component: WizPopup,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizPopup>;

export const Bottom: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "bottom",
  },
};

export const BottomLeft: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "bottomLeft",
  },
};

export const BottomRight: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "bottomRight",
  },
};

export const Top: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "top",
  },
};

export const TopLeft: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "topLeft",
  },
};

export const TopRight: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "topRight",
  },
};

export const Left: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "left",
  },
};

export const LeftTop: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "leftTop",
  },
};

export const LeftBottom: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "leftBottom",
  },
};

export const Right: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "right",
  },
};

export const RightTop: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "rightTop",
  },
};

export const RightBottom: Story = {
  render: PopupWrapTemplate,
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
    direction: "rightBottom",
  },
};
