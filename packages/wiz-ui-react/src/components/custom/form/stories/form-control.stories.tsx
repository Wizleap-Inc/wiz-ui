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

export const Direction: Story = {
  args: {
    label: "Label",
    direction: "vertical",
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

export const BorderLeft: Story = {
  args: {
    label: "Label",
    borderLeft: true,
    children: <WizTextInput placeholder="入力してください" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "borderLeftを指定すると、labelの左側にボーダーが表示されます。`borderColor` で色を指定できます。default は `green.800` です。",
      },
    },
  },
};

export const labelTagPosition: Story = {
  args: {
    label: "Label",
    required: true,
    labelTagPosition: "left",
    children: <WizTextInput placeholder="入力してください" required />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "labelTagPositionを指定すると、labelのTagの位置を変更できます。`left` または `right` を指定できます。default は `right` です。",
      },
    },
  },
};
