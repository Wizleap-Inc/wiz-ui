import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizChatCard } from "@/components/organisms";

export default {
  title: "Organisms/Chat/Card",
  component: WizChatCard,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    username: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
    messages: {
      control: {
        type: "object",
      },
    },
    close: {
      action: "close",
    },
    input: {
      action: "input",
    },
    submit: {
      action: "submit",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizChatCard },
  setup() {
    const newMessage = ref("");
    return { newMessage };
  },
  template: `<WizChatCard v-bind="$props" v-model="newMessage" @close="close" @input="input" @submit="submit" />`,
});

export const Default = Template.bind({});
Default.args = {
  username: "マネーキャリアスタッフ",
  placeholder: "入力してください",
  messages: [
    {
      message: "こんにちは",
      sender: "other",
      username: "相手の名前",
    },
    {
      message: "こんにちは",
      sender: "me",
    },
    {
      message: "元気ですか",
      sender: "other",
      username: "相手の名前",
    },
    {
      message: "元気です",
      sender: "me",
    },
    {
      message: "そうですか",
      sender: "other",
      username: "相手の名前",
    },
    {
      message: "はい",
      sender: "me",
    },
  ],
};
