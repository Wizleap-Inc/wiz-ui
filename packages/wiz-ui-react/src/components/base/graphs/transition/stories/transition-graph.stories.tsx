import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { WizTransitionGraph } from "../components";

const meta: Meta<typeof WizTransitionGraph> = {
  title: "Base/Graphs/Transition",
  component: WizTransitionGraph,
  parameters: {
    docs: {
      description: {
        component: `
frequencyの値が一番大きいdataが最大値となるようにグラフが描画されます。
減少する遷移の場合、Droppedというラベルが付きます。
      `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizTransitionGraph>;

const DUMMY_DATA: ComponentProps<typeof WizTransitionGraph>["data"] = [
  {
    label: "2022/5",
    frequency: 75,
  },
  {
    label: "2022/6",
    frequency: 40,
  },
  {
    label: "2022/7",
    frequency: 25,
  },
];

export const Default: Story = {
  args: {
    data: DUMMY_DATA,
  },
};

export const Gain: Story = {
  args: {
    data: [...DUMMY_DATA].reverse(),
  },
  parameters: {
    docs: {
      description: {
        story: "増加する遷移の場合、Gainedというラベルが付きます。",
      },
    },
  },
};

export const Children: Story = {
  args: {
    data: DUMMY_DATA,
    children: (
      <span>
        ここは
        <br />
        childrenです
      </span>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "childrenを使うことで、ラベルの表示をカスタマイズできます。",
      },
    },
  },
};
