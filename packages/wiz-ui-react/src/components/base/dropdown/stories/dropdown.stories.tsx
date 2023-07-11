/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizTextButton } from "@/components";

import { WizDropdown } from "../components";
import { WizDropdownItem } from "../components/dropdown-item";

const meta: Meta<typeof WizDropdown> = {
  title: "Base/Dropdown",
  component: WizDropdown,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof WizDropdown>;

const Template: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <WizDropdown
        {...args}
        isOpen={isOpen}
        options={
          <>
            <WizDropdownItem>選択肢1</WizDropdownItem>
            <WizDropdownItem>選択肢2</WizDropdownItem>
            <WizDropdownItem>選択肢3</WizDropdownItem>
            <WizDropdownItem disabled>選択肢4</WizDropdownItem>
            <WizDropdownItem>選択肢5</WizDropdownItem>
          </>
        }
        onClose={() => setIsOpen(false)}
      >
        <WizTextButton onClick={() => setIsOpen((current) => !current)}>
          Click me
        </WizTextButton>
      </WizDropdown>
    );
  },
};

export const Default: Story = {
  ...Template,
};

export const Skeleton: Story = {
  ...Template,
  args: {
    skeleton: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dropdown の選択肢にスケルトンスクリーンを指定することができます。",
      },
    },
  },
};

export const Gap: Story = {
  ...Template,
  args: {
    gap: "lg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "gap を指定することができます。選択肢はVariablesのSpacingKeysを参照してください。",
      },
    },
  },
};

export const IsDirectionFixed: Story = {
  ...Template,
  args: {
    isDirectionFixed: true,
  },
  parameters: {
    docs: {
      description: {
        story: `isDirectionFixed を指定することで、Popup の表示位置を固定することができます。 `,
      },
    },
  },
};
