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
      message: "こんにちは",
      sender: "other",
      username: "マネーキャリアスタッフ",
    },
    {
      message: "テキストテキストテキストテキスト",
      sender: "me",
    },
    {
      message: "テキストテキストテキストテキスト",
      sender: "other",
      username: "マネーキャリアスタッフ",
    },
    {
      message: "こんにちは",
      sender: "other",
      username: "マネーキャリアスタッフ",
    },
    {
      message: "テキストテキストテキストテキスト",
      sender: "me",
    },
    {
      message: "テキストテキストテキストテキスト",
      sender: "other",
      username: "マネーキャリアスタッフ",
    },
    {
      message: "こんにちは",
      sender: "other",
      username: "マネーキャリアスタッフ",
    },
    {
      message: "テキストテキストテキストテキスト",
      sender: "me",
    },
    {
      message: "テキストテキストテキストテキスト",
      sender: "other",
      username: "マネーキャリアスタッフ",
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
