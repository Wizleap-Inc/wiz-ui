import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { WizHStack, WizVStack } from "@/components/base/stack";

import { WizCheckBoxNew } from "../components";

const meta: Meta<typeof WizCheckBoxNew> = {
  title: "Base/Input/CheckBoxNew",
  component: WizCheckBoxNew,
};

export default meta;
type Story = StoryObj<typeof WizCheckBoxNew>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};

export const Variations: Story = {
  render: () => {
    const variations: ComponentProps<typeof WizCheckBoxNew>[][] = [
      [
        { checked: false },
        { checked: false, disabled: true },
        { checked: false, strikeThrough: true },
      ],
      [
        { checked: true },
        { checked: true, disabled: true },
        { checked: true, strikeThrough: true },
      ],
      [
        { checked: false, bordered: true },
        { checked: false, bordered: true, disabled: true },
        { checked: false, bordered: true, error: true },
        { checked: false, bordered: true, strikeThrough: true },
      ],
      [
        { checked: true, bordered: true },
        { checked: true, bordered: true, disabled: true },
        { checked: true, bordered: true, error: true },
        { checked: true, bordered: true, strikeThrough: true },
      ],
    ];
    return (
      <WizVStack gap="md">
        {variations.map((row, i) => (
          <WizHStack gap="xl" key={i}>
            {row.map((props, j) => (
              <WizCheckBoxNew {...props} key={j}>
                Label
              </WizCheckBoxNew>
            ))}
          </WizHStack>
        ))}
      </WizVStack>
    );
  },
  parameters: {
    controls: {
      disabled: true,
    },
  },
};
