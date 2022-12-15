import { StoryFn } from "@storybook/vue";

import WizUploadInput from "./upload.vue";

export default {
  title: "Base/Input/Upload",
  component: WizUploadInput,
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizUploadInput },
  template: `<div style="padding:100px;"><WizUploadInput v-bind="$props">{{ slot }}<template #content>コンテンツがない場合に表示するスロット</template></WizUploadInput></div>`,
});

export const Default = Template.bind({});
Default.args = {
  slot: "",
};
