import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useState } from "react";

import { WizCheckBox } from "../components/checkbox";

const meta: Meta<typeof WizCheckBox> = {
  title: "Base/Input/CheckBox",
  component: WizCheckBox,
};

export default meta;
type Story = StoryObj<typeof WizCheckBox>;

const DUMMY_OPTIONS: ComponentProps<typeof WizCheckBox>["options"] = [
  { label: "test1", value: 1, key: "test1" },
  { label: "test2", value: 2, key: "test2" },
  { label: "test3", value: 3, key: "test3" },
  { label: "test4", value: 4, key: "test4" },
];

const Template: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [values, setValues] = useState<number[]>(args.values ?? []);
    return (
      <div>
        <p>入力値：[{values.join(", ")}]</p>
        <WizCheckBox
          {...args}
          values={values}
          onChange={(updated) => setValues(updated)}
        />
      </div>
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {
    options: DUMMY_OPTIONS,
  },
};

export const Options: Story = {
  ...Template,
  args: {
    options: DUMMY_OPTIONS,
  },
  parameters: {
    docs: {
      description: {
        story: `
optionsには、labelとvalueとkeyを指定してください。
labelは表示される文字列、valueは入力値として使用されます。<br/>
keyはcheckboxのidとして使用されます。keyは一意である必要があります。
        `,
      },
    },
  },
};

export const AllDisabled: Story = {
  ...Template,
  args: {
    disabled: true,
    options: DUMMY_OPTIONS,
  },
  parameters: {
    docs: {
      description: {
        story:
          "disabledをtrueにすると、全てのチェックボックスがdisabledになります。",
      },
    },
  },
};

export const SpotDisabled: Story = {
  ...Template,
  parameters: {
    docs: {
      description: {
        story:
          "optionsの中にdisabledをtrueにすると、そのチェックボックスがdisabledになります。",
      },
    },
  },
  args: {
    options: DUMMY_OPTIONS.map((option, i) => ({
      ...option,
      disabled: i % 2 === 1,
    })),
  },
};

export const Vertical: Story = {
  ...Template,
  args: {
    options: DUMMY_OPTIONS,
    direction: "vertical",
  },
  parameters: {
    docs: {
      description: {
        story: "directionをverticalにすると、チェックボックスが縦に並びます。",
      },
    },
  },
};

export const Gap: Story = {
  ...Template,
  args: {
    options: DUMMY_OPTIONS,
    gap: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: "gapを指定すると、チェックボックスの間に余白を設定できます。",
      },
    },
  },
};

export const StrikeThrough: Story = {
  ...Template,
  args: {
    options: DUMMY_OPTIONS.map((option, i) => ({
      ...option,
      disabled: i % 2 === 1,
    })),
    values: [1, 2],
    strikeThrough: true,
  },
};
