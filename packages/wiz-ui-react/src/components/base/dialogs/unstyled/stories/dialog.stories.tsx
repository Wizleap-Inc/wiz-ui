/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizBox, WizHStack, WizText } from "@/components";

import { WizUnstyledDialog } from "../components";

const meta: Meta<typeof WizUnstyledDialog> = {
  title: "Base/Dialogs/UnstyledDialog",
  component: WizUnstyledDialog,
};

export default meta;
type Story = StoryObj<typeof WizUnstyledDialog>;

const ExampleContent = () => {
  return (
    <WizBox bgColor="white.800" minWidth="300px" minHeight="300px">
      <WizHStack justify="center" align="center" p="xl">
        <WizText>Dialog Content</WizText>
      </WizHStack>
    </WizBox>
  );
};

const Template: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ height: "200vh" }}>
        <WizUnstyledDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <ExampleContent />
        </WizUnstyledDialog>
        <button onClick={() => setIsOpen(true)}>Open</button>
      </div>
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {
    isOpen: true,
  },
};
