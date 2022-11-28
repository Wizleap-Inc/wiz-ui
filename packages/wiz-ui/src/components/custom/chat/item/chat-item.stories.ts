import { StoryFn } from "@storybook/vue";

import { Message } from "..";

import { WizChatItem } from ".";

export default {
  title: "Custom/Chat/Item",
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
    hideReadStatus: {
      control: { type: "boolean" },
    },
    hideTimestamp: {
      control: { type: "boolean" },
    },
  },
};

const dummyItems: Record<string, Message> = {
  otherChatItem: {
    message: "こんにちは",
    sender: "other",
    username: "ユーザー名",
    time: new Date(),
  },
  myChatItem: {
    message: "こんにちは",
    sender: "me",
    read: true,
    time: new Date(),
  },
};

export const ChatItemOwner: StoryFn = () => ({
  components: { WizChatItem },
  setup: () => dummyItems,
  template: `
    <div>
      <WizChatItem :content="otherChatItem" />
      <WizChatItem :content="myChatItem" />
    </div>
  `,
});

export const HideReadStatus: StoryFn = () => ({
  components: { WizChatItem },
  setup: () => dummyItems,
  template: `
    <div>
      <WizChatItem :content="otherChatItem" hide-read-status />
      <WizChatItem :content="myChatItem" hide-read-status />
    </div>
  `,
});

export const HideTimestamp: StoryFn = () => ({
  components: { WizChatItem },
  setup: () => dummyItems,
  template: `
    <div>
      <WizChatItem :content="otherChatItem" hide-timestamp />
      <WizChatItem :content="myChatItem" hide-timestamp />
    </div>
  `,
});

export const Overview: StoryFn = (_, { argTypes }) => ({
  args: Object.keys(argTypes),
  components: { WizChatItem },
  setup() {
    const OthersMessageObj: Message = {
      message: "こんにちは",
      sender: "other",
      username: "ユーザー名",
      time: new Date("2021-01-01 00:10:00"),
    };
    const unreadMyMessageObj: Message = {
      message: "こんにちは",
      sender: "me",
      read: false,
      time: new Date("2021-01-02 00:00:00"),
    };
    const readMyMessageObj: Message = {
      message: "こんにちは",
      sender: "me",
      read: true,
      time: new Date("2021-01-01 00:00:00"),
    };
    return {
      OthersMessageObj,
      unreadMyMessageObj,
      readMyMessageObj,
    };
  },
  template: `
    <div style="width: 300px; border: 1px solid #ccc; border-radius: 4px; padding: 8px; display: flex; flex-direction: column; gap: 8px;">
      <WizChatItem v-for="message in [OthersMessageObj, unreadMyMessageObj, readMyMessageObj]" :key="message.time" :content="message" v-bind="$props" />
    </div>
  `,
});
