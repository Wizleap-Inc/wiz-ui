import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizBox } from "@/components/atoms";
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
    isOpen: {
      control: {
        type: "boolean",
      },
    },
    hideReadStatus: {
      control: { type: "boolean" },
    },
    hideTimestamp: {
      control: { type: "boolean" },
    },
    toggleDisplay: {
      action: "toggleDisplay",
    },
    input: {
      action: "input",
    },
    submit: {
      action: "submit",
    },
  },
};

const templateArgs = {
  username: "マネーキャリアスタッフ",
  placeholder: "入力してください",
  messages: [
    {
      message: "こんにちは、マネーキャリアスタッフの田中です。",
      sender: "other",
      username: "マネーキャリアスタッフ",
      time: new Date(),
    },
    {
      message: "こんにちは、〇〇です。よろしくお願いします。",
      sender: "me",
      read: true,
      time: new Date(),
    },
    {
      message: "よろしくお願いします。",
      sender: "other",
      username: "マネーキャリアスタッフ",
      time: new Date(),
    },
    {
      message: "面談者が時間になっても来ない場合は、どうすればいいですか？",
      sender: "me",
      read: true,
      time: new Date(),
    },
    {
      message: "不在申請ですね、承知しました少々お待ちください。",
      sender: "other",
      username: "マネーキャリアスタッフ",
      time: new Date(),
    },
    {
      message: "お願いします。",
      sender: "me",
      read: false,
      time: new Date(),
    },
  ],
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizChatCard, WizBox },
  setup() {
    const newMessage = ref("");
    return { newMessage };
  },
  template: `<WizChatCard v-bind="$props" v-model="newMessage" @toggleDisplay="toggleDisplay" @input="input" @submit="submit" />`,
});

export const Open = Template.bind({});
Open.args = {
  ...templateArgs,
  isOpen: true,
};

export const Closed = Template.bind({});
Closed.args = {
  ...templateArgs,
  isOpen: false,
};

const PlaygroundTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizChatCard, WizBox },
  setup() {
    const isFloatingMenuOpen = ref(false);
    const messages = ref(templateArgs.messages);
    const newMessage = ref("");
    const toggleDisplay = () =>
      (isFloatingMenuOpen.value = !isFloatingMenuOpen.value);
    const postMessage = () => {
      messages.value.push({
        message: newMessage.value,
        sender: "me",
        read: false,
        time: new Date(),
      });
      newMessage.value = "";
    };
    return {
      messages,
      newMessage,
      isFloatingMenuOpen,
      toggleDisplay,
      postMessage,
    };
  },
  template: `
    <WizChatCard
      v-bind="$props"
      v-model="newMessage"
      :messages="messages"
      :isOpen="isFloatingMenuOpen"
      @toggleDisplay="toggleDisplay"
      @input="input"
      @submit="() => {
        submit();
        postMessage();
      }"
    />
  `,
});

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  username: templateArgs.username,
  placeholder: templateArgs.placeholder,
};
