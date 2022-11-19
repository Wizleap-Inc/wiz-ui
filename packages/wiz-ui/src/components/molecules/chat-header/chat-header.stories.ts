import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizChatHeader } from "@/components/molecules/chat-header";

export default {
  title: "Molecules/Chat/Header",
  component: WizChatHeader,
  argTypes: {
    username: {
      control: {
        type: "text",
      },
    },
    close: {
      action: "close",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizChatHeader },
  setup() {
    const username = ref("");
    return { username };
  },
  template: `<WizChatHeader v-bind="$props" @close="close" />`,
});

export const Default = Template.bind({});
Default.args = {};

export const Username = Template.bind({});
Username.args = {
  username: "マネーキャリアスタッフ",
};
