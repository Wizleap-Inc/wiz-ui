import { StoryFn } from "@storybook/vue";

import WizUploadInput from "./upload.vue";

export default {
  title: "Base/Input/Upload",
  component: WizUploadInput,
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizUploadInput },
  setup() {
    const uploadUrl = "http://localhost:6006";
    return { uploadUrl };
  },
  template: `<div style="padding:100px;"><WizUploadInput v-bind="$props" :uploadUrl="uploadUrl"></WizUploadInput></div>`,
});

export const Default = Template.bind({});
Default.args = {};
