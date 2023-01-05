import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

import { WizBox } from "@/components";

import { WizChatCard } from ".";

export default {
  title: "Custom/Chat/Card",
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
    formRows: {
      control: {
        type: "number",
      },
    },
    haveNewMessage: {
      control: { type: "boolean" },
    },
    typingUsername: {
      control: { type: "text" },
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
} as Meta<typeof WizChatCard>;

const templateArgs = {
  username: "マネーキャリアスタッフ",
  placeholder: "入力してください",
  messages: [
    {
      message: "こんにちは、マネーキャリアスタッフの田中です。",
      sender: "other",
      username: "マネーキャリアスタッフ",
      time: new Date("2021-08-01T23:00:00.000+09:00"),
    },
    {
      message: "こんにちは、〇〇です。よろしくお願いします。",
      sender: "me",
      read: true,
      time: new Date("2021-08-02T00:00:00.000+09:00"),
    },
    {
      message: "よろしくお願いします。",
      sender: "other",
      username: "マネーキャリアスタッフ",
      time: new Date("2021-08-02T01:00:00.000+09:00"),
    },
    {
      message: "面談者が時間になっても来ない場合は、どうすればいいですか？",
      sender: "me",
      read: true,
      time: new Date("2021-08-02T02:00:00.000+09:00"),
    },
    {
      message: "不在申請ですね、承知しました少々お待ちください。",
      sender: "other",
      username: "マネーキャリアスタッフ",
      time: new Date("2021-08-02T03:00:00.000+09:00"),
    },
  ],
};

const Template: StoryFn<typeof WizChatCard> = (args) => ({
  components: { WizChatCard, WizBox },
  setup() {
    const newMessage = ref("");
    return { newMessage, args };
  },
  template: `<WizChatCard v-bind="args" v-model="newMessage" @toggleDisplay="args.toggleDisplay" @update:modelValue="args.input" @submit="args.submit" />`,
});

export const Open = Template.bind({});
Open.args = {
  ...templateArgs,
  isOpen: true,
};

export const FormRows = Template.bind({});
FormRows.args = {
  ...templateArgs,
  isOpen: true,
  formRows: 5,
};

export const SomeonesTyping = Template.bind({});
SomeonesTyping.args = {
  ...templateArgs,
  isOpen: true,
  typingUsername: "なんとかかんとか",
};

export const Closed = Template.bind({});
Closed.args = {
  ...templateArgs,
  isOpen: false,
};

export const HaveNewMessage = Template.bind({});
HaveNewMessage.args = {
  ...templateArgs,
  isOpen: false,
  haveNewMessage: true,
};

const PlaygroundTemplate: StoryFn<typeof WizChatCard> = (args) => ({
  components: { WizChatCard, WizBox },
  setup() {
    const haveNewMessage = ref(true);
    const isFloatingMenuOpen = ref(false);
    const messages = ref(templateArgs.messages);
    const newMessage = ref("");
    const toggleDisplay = () => {
      if (!isFloatingMenuOpen.value) haveNewMessage.value = false;
      isFloatingMenuOpen.value = !isFloatingMenuOpen.value;
    };
    const postMessage = () => {
      if (newMessage.value === "") return;
      messages.value.push({
        message: newMessage.value,
        sender: "me",
        read: false,
        time: new Date("2022-08-02T04:00:00.000+09:00"),
      });
      newMessage.value = "";
    };
    return {
      messages,
      newMessage,
      haveNewMessage,
      isFloatingMenuOpen,
      toggleDisplay,
      postMessage,
      args,
    };
  },
  template: `
    <WizChatCard
      v-bind="args"
      v-model="newMessage"
      :messages="messages"
      :isOpen="isFloatingMenuOpen"
      :haveNewMessage="haveNewMessage"
      @toggleDisplay="() => {
        args.toggleDisplay();
        toggleDisplay();
      }"
      @update:modelValue="args.input"
      @submit="() => {
        args.submit();
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
