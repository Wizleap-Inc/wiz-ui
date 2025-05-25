import { Meta, StoryObj } from "@storybook/react";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

import { WizTextButton } from "../../buttons";
import { WizHeader } from "../components/header";

const meta: Meta<typeof WizHeader> = {
  title: "Base/Header",
  component: WizHeader,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizHeader>;

const content = () => (
  <>
    <WizTextButton>Click</WizTextButton>
    <WizTextButton>Click</WizTextButton>
    <WizTextButton>Click</WizTextButton>
  </>
);

export const Default: Story = {
  args: {
    "data-testid": "header-test",
  },
};

export const LeftContent: Story = {
  args: {
    leftContent: content(),
  },
  render: (args) => <WizHeader {...args} />,
};

export const LeftContentWithGap: Story = {
  args: {
    leftContent: content(),
    gapLeft: "sm",
  },
  render: (args) => <WizHeader {...args} />,
};

export const RightContent: Story = {
  args: {
    rightContent: content(),
  },
  render: (args) => <WizHeader {...args} />,
};

export const RightContentWithGap: Story = {
  args: {
    rightContent: content(),
    gapRight: "sm",
  },
  render: (args) => <WizHeader {...args} />,
};

export const Fixed: Story = {
  args: {
    sticky: true,
    leftContent: content(),
    rightContent: content(),
  },
  render: (args) => (
    <div style={{ height: "200vh" }}>
      <WizHeader {...args} />
      <div style={{ marginTop: `${THEME.share.HEADER_HEIGHT}` }}>
        <h1>Scroll down</h1>
      </div>
    </div>
  ),
};
