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
        { defaultChecked: false },
        { defaultChecked: false, disabled: true },
        { defaultChecked: false, strikeThrough: true },
      ],
      [
        { defaultChecked: true },
        { defaultChecked: true, disabled: true },
        { defaultChecked: true, strikeThrough: true },
      ],
      [
        { defaultChecked: false, bordered: true },
        { defaultChecked: false, bordered: true, disabled: true },
        { defaultChecked: false, bordered: true, error: true },
        { defaultChecked: false, bordered: true, strikeThrough: true },
      ],
      [
        { defaultChecked: true, bordered: true },
        { defaultChecked: true, bordered: true, disabled: true },
        { defaultChecked: true, bordered: true, error: true },
        { defaultChecked: true, bordered: true, strikeThrough: true },
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

export const MultipleLines: Story = {
  render: () => {
    const multipleLines: ComponentProps<typeof WizCheckBoxNew>[][] = [
      [{ defaultChecked: false }],
      [{ defaultChecked: false, bordered: true }],
    ];
    return (
      <WizVStack gap="md">
        {multipleLines.map((row, i) => (
          <WizHStack gap="xl" key={i}>
            {row.map((props, j) => (
              <WizCheckBoxNew {...props} key={j}>
                <div>
                  <div>Label</div>
                  <div>Label</div>
                  <div>Label</div>
                </div>
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
