/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizTag, WizText, WizTextButton } from "@/components";

import { WizDialog } from "../components";

const meta: Meta<typeof WizDialog> = {
  title: "Base/Dialog",
  component: WizDialog,
};

export default meta;
type Story = StoryObj<typeof WizDialog>;

const ExampleTitle = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <WizTag color="gray.300" label="Tag" />
      <WizText bold color="gray.700">
        Dialog Title From Slot
      </WizText>
    </div>
  );
};

const ExampleContent = () => {
  return (
    <div>
      <WizText>Dialog Content</WizText>
    </div>
  );
};

const ExampleFooter = () => {
  return (
    <div>
      <WizTextButton>SUBMIT</WizTextButton>
    </div>
  );
};

const Template: Story = {
  render: (args) => (
    <div style={{ height: "200vh" }}>
      <WizDialog {...args} title={<ExampleTitle />} footer={<ExampleFooter />}>
        <ExampleContent />
      </WizDialog>{" "}
    </div>
  ),
};

export const Default: Story = {
  ...Template,
  args: {
    isOpen: true,
  },
};

export const MaxWidth: Story = {
  ...Template,
  args: {
    isOpen: true,
    maxWidth: "300px",
  },
};

export const Align: Story = {
  ...Template,
  args: {
    isOpen: true,
    align: "center",
  },
};

export const HideClose: Story = {
  ...Template,
  args: {
    isOpen: true,
    hideClose: true,
  },
};

export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ height: "200vh" }}>
        <WizDialog
          {...args}
          title={<ExampleTitle />}
          footer={<ExampleFooter />}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <ExampleContent />
        </WizDialog>
        <button onClick={() => setIsOpen(true)}>Open</button>
      </div>
    );
  },
};

export const NestedDialog: Story = {
  render: (args) => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    return (
      <div style={{ height: "200vh" }}>
        <WizDialog
          {...args}
          isOpen={isOpen1}
          footer={
            <WizTextButton onClick={() => setIsOpen2(true)}>
              Open Dialog 2
            </WizTextButton>
          }
          onClose={() => setIsOpen1(false)}
        >
          <WizText>Dialog 1</WizText>
        </WizDialog>
        <WizDialog
          {...args}
          isOpen={isOpen2}
          footer={
            <WizTextButton onClick={() => setIsOpen3(true)}>
              Open Dialog 3
            </WizTextButton>
          }
          maxWidth="300px"
          onClose={() => setIsOpen2(false)}
        >
          <WizText>Dialog 2</WizText>
        </WizDialog>
        <WizDialog {...args} isOpen={isOpen3} onClose={() => setIsOpen3(false)}>
          <WizText>Dialog 3</WizText>
        </WizDialog>
        <button onClick={() => setIsOpen1(true)}>Open</button>
      </div>
    );
  },
};
