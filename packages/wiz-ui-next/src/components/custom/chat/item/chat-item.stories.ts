import { StoryFn, Meta } from "@storybook/vue3";

import { Message } from "..";

import { WizChatItem } from ".";

export default {
  title: "Custom/Chat/Item",
  component: WizChatItem,
  argTypes: {
    content: {
      control: { type: "object" },
    },
    maxChatItemWidth: {
      control: { type: "string" },
    },
  },
} as Meta<typeof WizChatItem>;

const dummyData: Record<string, Message> = {
  otherChatItem: {
    message: "こんにちは",
    sender: "other",
    time: new Date("2021-01-01T00:00:00.000+09:00"),
  },
  myChatItem: {
    message: "こんにちは",
    sender: "me",
    time: new Date("2021-01-01T00:00:00.000+09:00"),
  },
};

export const ChatItemOwner: StoryFn<typeof WizChatItem> = (args) => ({
  components: { WizChatItem },
  setup: () => ({ ...dummyData, args }),
  template: `
    <div style="display: grid; grid-template-columns: max-content 300px; grid-gap: 1rem; align-items: center;">
      <div>me</div>
      <div><WizChatItem :content="myChatItem" /></div>
      <div>other</div>
      <div><WizChatItem :content="otherChatItem" /></div>
    </div>
  `,
});

export const ChatItemRead: StoryFn<typeof WizChatItem> = (args) => ({
  components: { WizChatItem },
  setup: () => ({ ...dummyData, args }),
  template: `
    <div style="display: grid; grid-template-columns: max-content 300px; grid-gap: 1rem; align-items: center;">
      <div>readers=undefined</div>
      <div><WizChatItem :content="{ ...myChatItem, readers: undefined }" /></div>
      <div>readers=[]</div>
      <div><WizChatItem :content="{ ...myChatItem, readers: [] }" /></div>
      <div>readers=['man1']</div>
      <div><WizChatItem :content="{ ...myChatItem, readers: ['man1'] }" /></div>
      <div>readers=['man1', 'man2']</div>
      <div><WizChatItem :content="{ ...myChatItem, readers: ['man1', 'man2'] }" /></div>
    </div>
  `,
});

export const ChatItemUsername: StoryFn<typeof WizChatItem> = (args) => ({
  components: { WizChatItem },
  setup: () => ({ ...dummyData, args }),
  template: `
    <div style="display: grid; grid-template-columns: max-content 300px; grid-gap: 1rem; align-items: center;">
      <div>me</div>
      <div><WizChatItem :content="{ ...myChatItem, username: 'マネーキャリアスタッフ' }" /></div>
      <div>other</div>
      <div><WizChatItem :content="{ ...otherChatItem, username: 'マネーキャリアスタッフ' }" /></div>
    </div>
  `,
});
