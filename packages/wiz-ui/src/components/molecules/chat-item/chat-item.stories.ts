import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizChatItem } from "@/components/molecules/chat-item";

export default {
  title: "Molecules/Chat/Item",
  component: WizChatItem,
  argTypes: {
    sender: {
      control: {
        type: "select",
        options: ["me", "other"],
      },
    },
    username: {
      control: {
        type: "text",
      },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizChatItem },
  setup() {
    const message = ref("");
    const sender = ref("");
    return { message, sender };
  },
  template: `<WizChatItem v-bind="$props" />`,
});

export const OthersChatItem = Template.bind({});
OthersChatItem.args = {
  content: {
    message: "こんにちは",
    sender: "other",
    username: "ユーザー名",
  },
};

export const MyChatItem = Template.bind({});
MyChatItem.args = {
  content: {
    message: "こんにちは",
    sender: "me",
    username: "ユーザー名",
  },
};

export const Overview: StoryFn = () => ({
  components: { WizChatItem },
  setup() {
    const othersMessageObj = {
      message: "こんにちは",
      sender: "other",
      username: "ユーザー名",
    };
    const myMessageObj = {
      message: "こんにちは",
      sender: "me",
      username: "ユーザー名",
    };
    return { othersMessageObj, myMessageObj };
  },
  template: `
    <div style="width: 300px; border: 1px solid #ccc; border-radius: 4px; padding: 8px;">
      <WizChatItem :content="othersMessageObj" />
      <WizChatItem :content="myMessageObj" />
      <WizChatItem :content="othersMessageObj" />
      <WizChatItem :content="myMessageObj" />
      <WizChatItem :content="othersMessageObj" />
      <WizChatItem :content="myMessageObj" />
    </div>
  `,
});
