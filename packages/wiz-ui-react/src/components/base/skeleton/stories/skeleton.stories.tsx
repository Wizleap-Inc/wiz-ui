import { Meta, StoryObj } from "@storybook/react";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizSkeleton } from "../components";

const meta: Meta<typeof WizSkeleton> = {
  title: "Base/Skeleton/Normal",
  component: WizSkeleton,
  argTypes: {
    width: {
      control: { type: "text" },
    },
    height: {
      control: { type: "text" },
    },
    borderRadius: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    isLoading: {
      control: { type: "boolean" },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
### WizSkeleton

RectSkeletonとも呼ばれる、サイズ自由な四角形のスケルトンを表示するコンポーネントです。

Propsでwidthとheightを指定することで、任意のサイズのスケルトンを表示することができます。
デフォルトでは、width/heightに100%を指定しているため、親要素のサイズに合わせてスケルトンが表示されます。
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizSkeleton>;

export const Default: Story = {
  args: {
    width: "100%",
    height: "100%",
    isLoading: true,
  },
  render: (args) => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <WizSkeleton {...args} />{" "}
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const WidthHeight: Story = {
  parameters: {
    docs: {
      description: {
        story: `
  しかし、HTMLは基本縦に伸縮するため、heightに100%を指定してもほとんどの場合は親要素に制約されてしまいます。
  この例では親要素のheightに絶対値が設定されていないため、heightに100%を指定してもスケルトンは親の伸縮に潰され、表示されません。
  
  そこでheightには基本的に実数値を指定して使います。
  `,
      },
    },
  },
  args: {
    width: "100%",
    height: "5rem",
    isLoading: true,
  },
  render: (args) => (
    <div>
      <WizSkeleton {...args} />{" "}
    </div>
  ),
};

export const Radius: Story = {
  parameters: {
    docs: {
      description: {
        story: `borderRadiusを指定することで、角の丸さを制御できます。`,
      },
    },
  },
  args: {
    borderRadius: "xl",
    isLoading: true,
  },
  render: (args) => (
    <div
      style={{
        width: "20vw",
        height: "10vh",
      }}
    >
      <WizSkeleton {...args} />{" "}
    </div>
  ),
};
