/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizAccordion } from "../components";

const meta: Meta<typeof WizAccordion> = {
  title: "Base/Accordion",
  component: WizAccordion,
};

export default meta;
type Story = StoryObj<typeof WizAccordion>;

const Template: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <WizAccordion
        {...args}
        isOpen={args.isOpen ?? isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      >
        <p>折りたたまれている部分です．</p>
        <p>折りたたまれている部分です．</p>
        <p>折りたたまれている部分です．</p>
      </WizAccordion>
    );
  },
};

export const Default: Story = {
  ...Template,
};

export const Color: Story = {
  ...Template,
  args: {
    bgColor: "gray.300",
    fontColor: "green.800",
  },
};

export const Open: Story = {
  ...Template,
  args: {
    isOpen: true,
  },
};

export const Multiple: Story = {
  render: (args) => {
    const [isOpens, setIsOpens] = useState<boolean[]>([true, false, false]);

    return (
      <>
        {Array.from({ length: isOpens.length }).map((_, i) => (
          <WizAccordion
            {...args}
            key={i}
            isOpen={isOpens[i]}
            onToggle={() =>
              setIsOpens(
                isOpens.map((isOpen, j) => (i === j ? !isOpen : isOpen))
              )
            }
          >
            <p>折りたたまれている部分です．</p>
            <p>折りたたまれている部分です．</p>
            <p>折りたたまれている部分です．</p>
          </WizAccordion>
        ))}
      </>
    );
  },
};
