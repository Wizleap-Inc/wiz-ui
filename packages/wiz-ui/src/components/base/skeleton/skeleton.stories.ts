import { Meta, StoryFn } from "@storybook/vue";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

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
    borderRadius: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    isLoading: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizSkeleton>;

export const Default: StoryFn<typeof WizSkeleton> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSkeleton },
  template: `
  <div style="width: 100vw; height: 100vh;">
    <WizSkeleton v-bind="$props" />
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

export const WidthHeight: StoryFn<typeof WizSkeleton> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSkeleton },
  template: `
  <div>
    <WizSkeleton v-bind="$props" />
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
export const Radius: StoryFn<typeof WizSkeleton> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSkeleton },
  template: `
  <div style="width: 20vw; height: 10vh;">
    <WizSkeleton v-bind="$props" />
  </div>
`,
});
Radius.args = {
  borderRadius: "xl",
  isLoading: true,
};

Radius.parameters = {
  docs: {
    description: {
      story: `borderRadiusを指定することで、角の丸さを制御できます。`,
    },
  },
};
