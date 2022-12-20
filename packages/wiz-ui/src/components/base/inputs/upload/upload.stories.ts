import { StoryFn } from "@storybook/vue";

import WizUploadInput from "./upload.vue";

export default {
  title: "Base/Input/Upload",
  component: WizUploadInput,
  argTypes: {
    dropFile: {
      action: "dropFile",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizUploadInput },
  template: `<div style="padding:100px;"><WizUploadInput v-bind="$props"></WizUploadInput><div style="margin-top:50px;"></div></div>`,
});

export const Default = Template.bind({});
Default.args = {};
