import { Meta, StoryObj } from "@storybook/react";

import { WizTextInput } from "@/components";

import { WizFormControl } from "../components";

const meta: Meta<typeof WizFormControl> = {
  title: "Custom/Form/Control",
  component: WizFormControl,
  parameters: {
    docs: {
      description: {
        component: `
### WizFormControl
各Inputコンポーネントをラップするコンポーネントです。そのInputコンポーネントのラベルやエラーメッセージを表示します。
    `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizFormControl>;

export const Default: Story = {
  args: {
    label: "Label",
    children: <WizTextInput placeholder="入力してください" />,
  },
};

export const HtmlFor: Story = {
  args: {
    label: "Label",
    htmlFor: "hogehoge",
    children: <WizTextInput placeholder="入力してください" id="hogehoge" />,
  },
};

export const Required: Story = {
  args: {
    label: "Label",
    required: true,
    children: <WizTextInput placeholder="入力してください" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "requiredを指定するとlabelの横に**WizTag**で必須と表示されます。",
      },
    },
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    error: "空白にはできません",
    children: <WizTextInput placeholder="入力してください" />,
  },
  parameters: {
    docs: {
      description: {
        story: "errorを指定するとエラーメッセージが表示されます。",
      },
    },
  },
};
