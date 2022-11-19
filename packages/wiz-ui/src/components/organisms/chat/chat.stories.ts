import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizChat } from "@/components/organisms";

export default {
  title: "Organisms/Chat",
  component: WizChat,
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
  components: { WizChat },
  setup() {
    const messages = ref([]);
    const newMessage = ref("");
    return { messages, newMessage };
  },
  template: `<WizChat v-bind="$props" v-model="newMessage" @close="close" @input="input" @submit="submit" />`,
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
