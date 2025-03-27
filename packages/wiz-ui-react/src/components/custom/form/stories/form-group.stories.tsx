import { Meta, StoryObj } from "@storybook/react";

import { WizTextInput } from "@/components";

import { WizFormControl, WizFormGroup } from "..";

import {
  AllInputErrorStory,
  AllInputErrorVerticalAlinedStory as AllInputErrorVerticalAlignedStory,
  AllInputStory,
  AllInputVerticalAlinedStory as AllInputVerticalAlignedStory,
} from "./all-input";

const meta: Meta<typeof WizFormGroup> = {
  title: "Custom/Form/Group",
  component: WizFormGroup,
  parameters: {
    docs: {
      description: {
        component: `
### WizFormGroup
各FormControlをまとめて表示するためのコンポーネントです。複数のFormControlを子要素に持たせて使用します。
    `,
      },
    },
  },
};

export default meta;
export type Story = StoryObj<typeof WizFormGroup>;

const Template: Story = {
  render: (args) => (
    <WizFormGroup {...args}>
      <WizFormControl label="Label1">
        <WizTextInput />
      </WizFormControl>
      <WizFormControl label="Label2" required>
        <WizTextInput />
      </WizFormControl>
    </WizFormGroup>
  ),
};

export const Default: Story = {
  ...Template,
};

export const LabelWidth: Story = {
  ...Template,
  args: {
    labelWidth: "6.25rem",
  },
  parameters: {
    docs: {
      description: {
        story: "子要素の**FormControl**のラベルの幅を一度に指定できます。",
      },
    },
  },
};

export const Gap: Story = {
  ...Template,
  args: {
    gap: "xl2",
  },
  parameters: {
    docs: {
      description: {
        story:
          "子要素の**FormControl**の各要素間のスペースを一度に指定できます。",
      },
    },
  },
};

export const LabelColor: Story = {
  ...Template,
  args: {
    labelColor: "red.500",
  },
  parameters: {
    docs: {
      description: {
        story: "子要素の**FormControl**の各要素のラベル色を一括指定できます。",
      },
    },
  },
};

export const LabelFontSize: Story = {
  ...Template,
  args: {
    labelFontSize: "xl3",
  },
  parameters: {
    docs: {
      description: {
        story:
          "子要素の**FormControl**の各要素のラベルサイズを一括指定できます。",
      },
    },
  },
};

export const AllInput: Story = AllInputStory;

export const AllInputError: Story = AllInputErrorStory;

export const AllInputVerticalAligned: Story = AllInputVerticalAlignedStory;

export const AllInputErrorVerticalAligned: Story =
  AllInputErrorVerticalAlignedStory;
