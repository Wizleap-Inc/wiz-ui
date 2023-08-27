import { StoryFn } from "@storybook/vue";

import { WizLoadingOverlay } from ".";

export default {
  title: "Base/LoadingOverlay",
  component: WizLoadingOverlay,
  argTypes: {
    isLoading: {
      control: {
        type: "boolean",
      },
    },
  },
};
const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizLoadingOverlay },
  template: `<WizLoadingOverlay v-bind="$props" />`,
});

export const Default = Template.bind({});
Default.args = {
  isLoading: true,
};
Default.parameters = {
  docs: {
    description: {
      story: `
LoadingOverlay は、画面のロード中に表示されるオーバーレイです。

position: absoluteで実装されているので、直近のrelativeな要素に対して表示されます。そのためbody直下に配置すれば、画面全体を覆うことができます。
      `.trim(),
    },
    source: {
      code: `
<template>
  <WizLoadingOverlay isLoading />
</template>
      `,
    },
  },
};
