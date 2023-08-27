import { Meta, StoryObj } from "@storybook/react";

import { WizLoadingOverlay } from "../components";

const meta: Meta<typeof WizLoadingOverlay> = {
  title: "Base/LoadingOverlay",
  component: WizLoadingOverlay,
};

export default meta;
type Story = StoryObj<typeof WizLoadingOverlay>;

export const Default: Story = {
  render: () => <WizLoadingOverlay isLoading={true} />,
};
