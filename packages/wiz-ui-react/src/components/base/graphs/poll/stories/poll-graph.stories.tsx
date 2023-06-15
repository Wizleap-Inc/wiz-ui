import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { WizPollGraph } from "../components";

const meta: Meta<typeof WizPollGraph> = {
  title: "Base/Graphs/Poll",
  component: WizPollGraph,
  parameters: {
    docs: {
      description: {
        component: `
## WizPollGraph

縦に連なる棒グラフを表示するコンポーネントです。
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizPollGraph>;

const DUMMY_DATA: ComponentProps<typeof WizPollGraph>["data"] = [
  { label: "2022/5", percentage: 50 },
  { label: "2022/4", percentage: 85 },
  { label: "2022/3", percentage: 40 },
  { label: "2022/2", percentage: 20 },
  { label: "2022/1", percentage: 5 },
  { label: "2021/12", percentage: 50 },
].map((data) => ({
  ...data,
  innerLabel: `${data.percentage}%`,
}));

export const Default: Story = {
  args: {
    data: DUMMY_DATA,
  },
};

export const ColorFixed: Story = {
  args: {
    data: DUMMY_DATA,
    isColorFixed: true,
  },
  parameters: {
    docs: {
      description: {
        story: `棒グラフの色を固定するかどうかを指定します。固定色はgreen.700です。`,
      },
    },
  },
};

export const RowCount: Story = {
  args: {
    data: DUMMY_DATA,
    rowCount: 10,
  },
  parameters: {
    docs: {
      description: {
        story: `棒グラフの表示数を指定します。`,
      },
    },
  },
};

export const LabelWidth: Story = {
  args: {
    data: DUMMY_DATA,
    labelWidth: "10rem",
  },
  parameters: {
    docs: {
      description: {
        story: `棒グラフのラベルの幅を指定します。`,
      },
    },
  },
};

export const NewLine: Story = {
  args: {
    data: DUMMY_DATA.map((data) => ({
      ...data,
      label: `${data.label}\n${data.label}`,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: `棒グラフのラベルに改行を含めることができます。`,
      },
    },
  },
};
