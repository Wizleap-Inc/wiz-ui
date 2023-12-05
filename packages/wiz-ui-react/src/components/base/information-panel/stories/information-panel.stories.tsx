import { Meta, StoryObj } from "@storybook/react";

import { WizInformationPanel } from "..";

const meta: Meta<typeof WizInformationPanel> = {
  title: "Base/InformationPanel",
  component: WizInformationPanel,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#EEF0EF" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizInformationPanel>;

export const Default: Story = {
  args: {
    messages: [{ text: "メッセージ1", type: "default" }],
  },
};

const linkComponent = (
  <a href="https://github.com/Wizleap-Inc/wiz-ui">wiz-ui repository</a>
);

export const Link: Story = {
  args: {
    messages: [linkComponent],
  },
};

export const Multiple: Story = {
  args: {
    messages: [
      { text: "メッセージ1", type: "default" },
      { text: "メッセージ2", type: "error" },
      { text: "メッセージ3", type: "default" },
    ],
  },
};

export const Width: Story = {
  args: {
    messages: [
      { text: "メッセージ1", type: "default" },
      { text: "メッセージ2", type: "error" },
      { text: "メッセージ3", type: "default" },
    ],
    width: "300px",
  },
};

export const Border: Story = {
  args: {
    messages: [
      { text: "メッセージ1", type: "default" },
      { text: "メッセージ2", type: "error" },
      { text: "メッセージ3", type: "default" },
    ],
    border: true,
  },
};
