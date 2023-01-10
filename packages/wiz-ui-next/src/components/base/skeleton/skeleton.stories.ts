import { Meta, StoryFn } from "@storybook/vue3";

import { WizSkeleton } from ".";

export default {
  title: "Base/Skeleton/Normal",
  component: WizSkeleton,
  argTypes: {
    width: {
      control: { type: "text" },
    },
    height: {
      control: { type: "text" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizSkeleton>;

export const Default: StoryFn<typeof WizSkeleton> = (args) => ({
  components: { WizSkeleton },
  setup: () => ({ args }),
  template: `
  <div style="width: 100vw; height: 100vh;">
    <WizSkeleton v-bind="args" />
  </div>
`,
});
Default.args = {
  width: "100%",
  height: "100%",
  isLoading: true,
};
Default.parameters = {
  docs: {
    description: {
      component: `
### WizSkeleton

RectSkeletonとも呼ばれる、サイズ自由な四角形のスケルトンを表示するコンポーネントです。

Propsでwidthとheightを指定することで、任意のサイズのスケルトンを表示することができます。
デフォルトでは、width/heightに100%を指定しているため、親要素のサイズに合わせてスケルトンが表示されます。
`,
    },
    source: {
      code: `
<template>
  <div style="width: 100vw; height: 100vh;">
    <WizSkeleton />
  </div>
</template>
`,
    },
  },
  layout: "fullscreen",
};

export const WidthHeight: StoryFn<typeof WizSkeleton> = (args) => ({
  components: { WizSkeleton },
  setup: () => ({ args }),
  template: `
  <div>
    <WizSkeleton v-bind="args" />
  </div>
`,
});
WidthHeight.args = {
  height: "5rem",
};
WidthHeight.parameters = {
  docs: {
    description: {
      story: `
しかし、HTMLは基本縦に伸縮するため、heightに100%を指定してもほとんどの場合は親要素に制約されてしまいます。
この例では親要素のheightに絶対値が設定されていないため、heightに100%を指定してもスケルトンは親の伸縮に潰され、表示されません。

そこでheightには基本的に実数値を指定して使います。
`,
    },
    source: {
      code: `
<template>
  <div>
    <WizSkeleton height="5rem" />
  </div>
</template>
`,
    },
  },
};
