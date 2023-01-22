import { StoryFn } from "@storybook/vue";

import { WizUpload } from ".";

export default {
  title: "Base/Input/Upload",
  component: WizUpload,
  argTypes: {},
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizUpload },
  setup() {
    const uploadUrl = "http://localhost:6006";
    return { uploadUrl };
  },
  template: `<div style="padding:100px;"><WizUpload v-bind="$props" :uploadUrl="uploadUrl"></WizUpload></div>`,
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <div style="padding:100px;"><WizUpload :uploadUrl="uploadUrl"></WizUpload></div>
</template>
      `,
    },
  },
};
