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

export const Sender = Template.bind({});
Sender.args = {
  message: "こんにちは",
  sender: "other",
  username: "ユーザー名",
};

export const Expand = Template.bind({});
Expand.args = {
  message: "こんにちは",
  sender: "me",
  username: "ユーザー名",
};

export const Overview: StoryFn = () => ({
  components: { WizChatItem },
  template: `
    <div style="width: 300px; border: 1px solid #ccc; border-radius: 4px; padding: 8px;">
      <WizChatItem message="こんにちは" sender="other" username="相手の名前" />
      <WizChatItem message="こんにちは" sender="me" />
      <WizChatItem message="元気ですか" sender="other" username="相手の名前" />
      <WizChatItem message="元気です" sender="me" />
      <WizChatItem message="そうですか" sender="other" username="相手の名前" />
      <WizChatItem message="はい" sender="me" />
    </div>
  `,
});
