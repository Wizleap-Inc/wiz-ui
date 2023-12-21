import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { WizHStack, WizVStack } from "@/components/base/stack";

import { WizRadioNew } from "../components";

const meta: Meta<typeof WizRadioNew> = {
  title: "Base/Input/RadioNew",
  component: WizRadioNew,
};

export default meta;
type Story = StoryObj<typeof WizRadioNew>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};

export const Variations: Story = {
  render: () => {
    const variations: ComponentProps<typeof WizRadioNew>[][] = [
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
              <WizRadioNew {...props} name={`${i},${j}`} key={j}>
                Label
              </WizRadioNew>
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
    const variations: ComponentProps<typeof WizRadioNew>[][] = [
      [{ checked: false }],
      [{ checked: true, bordered: true }],
    ];
    return (
      <WizVStack gap="md">
        {variations.map((row, i) => (
          <WizHStack gap="xl" key={i}>
            {row.map((props, j) => (
              <WizRadioNew {...props} name={`${i},${j}`} key={j}>
                <div>
                  <div>Label</div>
                  <div>Label</div>
                  <div>Label</div>
                </div>
              </WizRadioNew>
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
