import { Meta, StoryObj } from "@storybook/react";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { WizCheckBox } from "../components/checkbox";

const meta: Meta<typeof WizCheckBox> = {
  title: "Base/Input/CheckBox",
  component: WizCheckBox,
  argTypes: {
    options: {
      control: { type: "object" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    onChange: {
      action: "input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizCheckBox>;

const useCheckBox = (initValues: number[]) => {
  const [values, setValues] = useState<number[]>(initValues);
  const onChange = (value: number, checked: boolean) => {
    if (checked) {
      setValues([...values, value]);
    } else {
      setValues(values.filter((v) => v !== value));
    }
  };
  return { values, onChange };
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "",
      },
    },
  },
  args: {
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2" },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4" },
    ],
  },
  render: (args) => {
    const { values, onChange } = useCheckBox([]);
    return (
      <div>
        <p>入力値：[{values.join(", ")}]</p>
        <WizCheckBox {...args} value={values} onChange={onChange} />
      </div>
    );
  },
};

export const Options: Story = {
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
  args: {
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2" },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4" },
    ],
  },
  render: (args) => {
    const { values, onChange } = useCheckBox([]);
    return (
      <div>
        <p>入力値：[{values.join(", ")}]</p>
        <WizCheckBox {...args} value={values} onChange={onChange} />
      </div>
    );
  },
};

export const AllDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "",
      },
    },
  },
  args: {
    disabled: true,
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2" },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4" },
    ],
  },
  render: (args) => {
    const { values, onChange } = useCheckBox([]);
    return (
      <div>
        <p>入力値：[{values.join(", ")}]</p>
        <WizCheckBox {...args} value={values} onChange={onChange} />
      </div>
    );
  },
};

export const SpotDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "optionsの中にdisabledをtrueにすると、そのチェックボックスがdisabledになります。",
      },
    },
  },
  args: {
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2", disabled: true },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4", disabled: true },
    ],
  },
  render: (args) => {
    const { values, onChange } = useCheckBox([]);
    return (
      <div>
        <p>入力値：[{values.join(", ")}]</p>
        <WizCheckBox {...args} value={values} onChange={onChange} />
      </div>
    );
  },
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: "directionをverticalにすると、チェックボックスが縦に並びます。",
      },
    },
  },
  args: {
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2", disabled: true },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4", disabled: true },
    ],
  },
  render: (args) => {
    const { values, onChange } = useCheckBox([]);
    return (
      <div>
        <p>入力値：[{values.join(", ")}]</p>
        <WizCheckBox {...args} value={values} onChange={onChange} />
      </div>
    );
  },
};

export const Gap: Story = {
  parameters: {
    docs: {
      description: {
        story: "gapを指定すると、チェックボックスの間に余白を設定できます。",
      },
    },
  },
  args: {
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2" },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4" },
    ],
    gap: "sm",
  },
  render: (args) => {
    const { values, onChange } = useCheckBox([]);
    return (
      <div>
        <p>入力値：[{values.join(", ")}]</p>
        <WizCheckBox {...args} value={values} onChange={onChange} />
      </div>
    );
  },
};

export const StrikeThrough: Story = {
  parameters: {
    docs: {
      description: {
        story: "gapを指定すると、チェックボックスの間に余白を設定できます。",
      },
    },
  },
  args: {
    options: [
      { label: "test1", value: 1, key: "test1" },
      { label: "test2", value: 2, key: "test2", disabled: true },
      { label: "test3", value: 3, key: "test3" },
      { label: "test4", value: 4, key: "test4", disabled: true },
    ],
    strikeThrough: true,
  },
  render: (args) => {
    const { values, onChange } = useCheckBox([1, 2]);
    return (
      <div>
        <p>入力値：[{values.join(", ")}]</p>
        <WizCheckBox {...args} value={values} onChange={onChange} />
      </div>
    );
  },
};
