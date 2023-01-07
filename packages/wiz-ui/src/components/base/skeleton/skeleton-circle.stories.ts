import { Meta, StoryFn } from "@storybook/vue";

import { WizAvatar } from "@/components";

import { WizSkeletonCircle } from ".";

export default {
  title: "Base/Skeleton/Circle",
  component: WizSkeletonCircle,
  argTypes: {
    size: {
      control: { type: "text" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizSkeletonCircle>;

const Template: StoryFn<typeof WizSkeletonCircle> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSkeletonCircle, WizAvatar },
  template: `
  <WizSkeletonCircle v-bind="$props">
    <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
  </WizSkeletonCircle>
`,
});

interface Props {
  size: string;
  isLoading: boolean;
}

const CODE_TEMPLATE = ({ size, isLoading }: Partial<Props>) => `
<template>
  <WizSkeletonCircle${
    (size ? ` :size="${size}"` : "") +
    (isLoading ? ` :isLoading="${isLoading}"` : "")
  }>
    <WizAvatar src="./public/images/avatar-1.png" alt="avatar" />
  </WizSkeletonCircle>
</template>
`;

export const Default = Template.bind({});
Default.args = {
  size: "2.5rem",
  isLoading: true,
};
Default.parameters = {
  docs: {
    description: {
      component: `
### WizSkeletonCircle

円形のスケルトンを表示するコンポーネントです。主に（というかほぼ）アバターのスケルトンに使用します。
`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const Size = Template.bind({});
Size.args = {
  size: "5rem",
  isLoading: true,
};
Size.parameters = {
  docs: {
    description: {
      story: `
Circleの直径を指定することができます。
`,
    },
    source: {
      code: CODE_TEMPLATE({ size: "5rem" }),
    },
  },
};
