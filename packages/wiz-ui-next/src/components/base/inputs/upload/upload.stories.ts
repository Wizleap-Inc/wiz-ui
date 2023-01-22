import { StoryFn, Meta } from "@storybook/vue3";

import { WizUpload } from ".";

export default {
  title: "Base/Input/Upload",
  component: WizUpload,
  argTypes: {},
} as Meta<typeof WizUpload>;

const Template: StoryFn<typeof WizUpload> = (args) => ({
  components: { WizUpload },
  setup() {
    const uploadUrl = "http://localhost:6006";
    return { uploadUrl, args };
  },
  template: `<div style="padding:100px;"><WizUpload v-bind="args" :uploadUrl="uploadUrl"></WizUpload></div>`,
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
